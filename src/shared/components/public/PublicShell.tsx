import Link from 'next/link';

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand">VALEOX</Link>
          <nav>
            <Link href="/resultados">Resultados</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
