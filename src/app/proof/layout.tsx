export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: '440px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}
