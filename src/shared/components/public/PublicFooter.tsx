import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="brand">VALEOX</p>
        <p>El sistema correcto determina el resultado.</p>
        <div className="footer-links">
          <Link href="/firma">Firma</Link>
          <Link href="/metodo">Método</Link>
          <Link href="/soluciones">Soluciones</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
