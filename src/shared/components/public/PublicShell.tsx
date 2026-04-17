import Link from 'next/link';

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand">VALEOX</Link>
          <nav>
            <Link href="/firma">Firma</Link>
            <Link href="/metodo">Método</Link>
            <Link href="/soluciones">Soluciones</Link>
            <Link href="/resultados">Resultados</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
