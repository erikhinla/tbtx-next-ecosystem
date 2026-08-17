import { redirect } from 'next/navigation';

/** Public front door = TBTX hub (Digital Fog \u2192 diagnostic). */
export default function RootEntry() {
  redirect('/tbtx');
}
