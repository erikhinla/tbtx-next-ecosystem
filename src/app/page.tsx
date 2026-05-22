import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const hostname = headersList.get('host') || '';

  if (hostname.includes('bizbuilders')) {
    redirect('/bbai');
  }

  if (hostname.includes('bizbotmrktng') || hostname.includes('bizbot')) {
    redirect('/bbm');
  }

  if (hostname.includes('transformby10x')) {
    redirect('/tbtx');
  }

  // Fallback ecosystem index for localhost/preview
  redirect('/tbtx');
}
