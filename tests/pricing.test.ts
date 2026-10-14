import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateKeyPairSync } from 'node:crypto';
import { describe, it } from 'node:test';
import { calculateEngagementPrice } from '../src/lib/proof/pricing';
import { manifestation } from '../src/lib/proof/manifestation';
import choices from '../src/lib/proof/site-choice-values.json';
import { siteQuote } from '../src/lib/proof/site-quote';
import { POST as price } from '../src/app/api/engagement-price/route';
import { POST as handoff } from '../src/app/api/proof-handoff/route';
import { GET as slots, POST as book } from '../src/app/api/proof-time/route';

const selections = Array(15).fill(1);
describe('locked website pricing', () => {
  it('reproduces all approved examples and enforces input bounds', () => {
    for (const [score, finalPrice] of [[42,5985],[68,9690],[25,3563],[8,1500],[0,1500],[100,14250]]) {
      assert.equal(calculateEngagementPrice(score).finalPrice, finalPrice);
    }
    for (const bad of [NaN, Infinity, -1, 101]) assert.throws(() => calculateEngagementPrice(bad));
  });
  it('matches the actual public choice catalog without changing point values', () => {
    const source = readFileSync('public/review/proof-momentum/questions.js', 'utf8');
    const catalog = JSON.parse(source.slice(source.indexOf('=') + 1).trim().replace(/;$/, ''));
    assert.deepEqual(choices, catalog.business.map((q: {options: Array<{value: number}>}) => q.options.map((o) => o.value)));
  });
  it('prices the canonical manifestation result, not the answer average', () => {
    const model = manifestation({ answers: choices.map((q) => q[1] as 0|1|2), departmentId: 'OPS', modifierOn: false });
    const quote = siteQuote(selections, 'OPS')!;
    assert.equal(quote.score, model.score);
    assert.equal(quote.finalPrice, calculateEngagementPrice(model.score).finalPrice);
    assert.notEqual(quote.score, model.index);
  });
  it('rejects incomplete, out-of-range or unsupported department requests', () => {
    for (const input of [null, [], Array(15).fill(null), Array(15).fill(-1), Array(15).fill(4), Array(15).fill(1.5)]) {
      assert.equal(siteQuote(input, 'OPS'), null);
    }
    assert.equal(siteQuote(selections, '__proto__'), null);
    assert.equal(siteQuote(selections, 'IT'), null);
  });
  it('returns only the public breakdown and ignores submitted scores and prices', async () => {
    const response = await price(new Request('http://localhost/api/engagement-price', {
      method: 'POST', body: JSON.stringify({ selections, departmentId: 'FIN', score: 100, finalPrice: 1 }),
    }));
    const quote = await response.json();
    assert.equal(quote.finalPrice, siteQuote(selections, 'FIN')!.finalPrice);
    assert.deepEqual(Object.keys(quote).sort(), ['ok','currency','version','departmentId','modifierOn','score','annualLoad','rawEngagementPrice','finalPrice','floorApplied'].sort());
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
  });
  it('carries answers to booking by POST and one-use storage, not a public URL', async () => {
    const form = new URLSearchParams({ selections: JSON.stringify(selections), departmentId: 'FIN' });
    const response = await handoff(new Request('http://localhost/api/proof-handoff', { method: 'POST', body: form }));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes("location.replace('/proof?book=1')"));
    assert.ok(html.includes("sessionStorage.setItem('tbtx-proof-handoff'"));
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    const invalid = await handoff(new Request('http://localhost/api/proof-handoff', { method: 'POST', body: new URLSearchParams({ selections: '[]', departmentId: 'FIN' }) }));
    assert.equal(invalid.status, 400);
  });
  it('recalculates the price in the booking record with entirely mocked calendar calls', async () => {
    const previousFetch = globalThis.fetch;
    const previousKey = process.env.GOOGLE_BOOKING_SA;
    const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    process.env.GOOGLE_BOOKING_SA = JSON.stringify({ client_email: 'test@example.invalid', token_uri: 'https://example.invalid/token', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) });
    let event: { description: string } | null = null;
    globalThis.fetch = async (url, init) => {
      const destination = String(url);
      if (destination === 'https://example.invalid/token') return Response.json({ access_token: 'test-token' });
      if (destination.endsWith('/freeBusy')) return Response.json({ calendars: { 'erikhbush@gmail.com': { busy: [] } } });
      if (destination.includes('/events?')) { event = JSON.parse(String(init?.body)); return Response.json({ id: 'mock-only' }); }
      throw new Error('Unexpected external call in test: ' + destination);
    };
    try {
      const availability = await (await slots()).json();
      const response = await book(new Request('http://localhost/api/proof-time', { method: 'POST', body: JSON.stringify({
        name: 'Test', email: 'test@example.invalid', start: availability.slots[0].start,
        trace: 'Fifteen answers from a mocked test case.', pricing: { selections, departmentId: 'OPS', modifierOn: true, finalPrice: 1 },
      }) }));
      assert.equal(response.status, 200);
      const expected = siteQuote(selections, 'OPS', true)!;
      assert.ok((event as unknown as {description: string}).description.includes(`USD ${expected.finalPrice}`));
      assert.ok((event as unknown as {description: string}).description.includes('Model assumption, not measured business loss'));
    } finally {
      globalThis.fetch = previousFetch;
      if (previousKey === undefined) delete process.env.GOOGLE_BOOKING_SA; else process.env.GOOGLE_BOOKING_SA = previousKey;
    }
  });
});

it('preserves both modifier states in the site quote and POST handoff', async () => {
  for (const modifierOn of [false, true]) {
    const quote = siteQuote(selections, 'OPS', modifierOn)!;
    const model = manifestation({ answers: choices.map((q) => q[1] as 0|1|2), departmentId: 'OPS', modifierOn });
    assert.equal(quote.score, model.score);
    assert.equal(quote.finalPrice, calculateEngagementPrice(model.score).finalPrice);
    const response = await handoff(new Request('http://localhost/api/proof-handoff', {
      method: 'POST', body: new URLSearchParams({ selections: JSON.stringify(selections), departmentId: 'OPS', modifierOn: String(modifierOn) }),
    }));
    assert.ok((await response.text()).includes(`"modifierOn":${modifierOn}`));
  }
  assert.equal(siteQuote(selections, 'OPS', 'true'), null);
});
