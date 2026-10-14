import { siteQuote } from '../../../lib/proof/site-quote';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  let selections: unknown;
  try { selections = JSON.parse(String(form?.get('selections'))); } catch { selections = null; }
  const departmentId = form?.get('departmentId');
  const modifierField = form?.get('modifierOn');
  if (modifierField !== null && modifierField !== 'true' && modifierField !== 'false') return new Response('Invalid modifier.', { status: 400 });
  const modifierOn = modifierField === 'true';
  if (!siteQuote(selections, departmentId, modifierOn)) return new Response('Invalid PROOF handoff.', { status: 400 });
  // Transfer in the POST body and one-use session storage, never in a public URL.
  const payload = JSON.stringify({ selections, departmentId, modifierOn, source: 'standalone' }).replace(/</g, '\\u003c');
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><title>Continue to booking</title>
<p id="status">Carrying your PROOF answers into booking.</p>
<script>try{sessionStorage.setItem('tbtx-proof-handoff',JSON.stringify(${payload}));location.replace('/proof?book=1');}
catch{document.getElementById('status').textContent='The browser could not carry the answers. Return to PROOF and try again with session storage enabled.';}</script>
<a href="/proof">Return to PROOF</a></html>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
  });
}
