import Link from 'next/link';
import { PublicFooter } from './PublicFooter';
import { PublicNav } from './PublicNav';

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand">VALEOX</Link>
          <PublicNav />
        </div>
      </header>
      {children}
      <PublicFooter />
    </>
  );
}
