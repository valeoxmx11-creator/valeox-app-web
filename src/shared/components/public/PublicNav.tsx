'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/firma', label: 'Firma' },
  { href: '/metodo', label: 'Método' },
  { href: '/soluciones', label: 'Soluciones' },
  { href: '/resultados', label: 'Resultados' },
  { href: '/insights', label: 'Insights' },
  { href: '/contacto', label: 'Contacto' },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="menu-btn" onClick={() => setOpen((value) => !value)}>
        Menú
      </button>
      <nav className={`topnav ${open ? 'open' : ''}`}>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? 'active-link' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
