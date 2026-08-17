export async function captureDiagnosticCompletion(
  email: string,
  score: number,
  profileName: string
): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const key = 'tbtx_diagnostic_completions';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push({ email, score, profileName, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
    } catch {
      // ignore
    }
  }
}
