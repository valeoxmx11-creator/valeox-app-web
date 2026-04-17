import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: 'VALEOX',
  description: 'Ingeniería operativa y transformación empresarial.',
  openGraph: {
    title: 'VALEOX',
    description: 'Ingeniería operativa y transformación empresarial.',
    siteName: 'VALEOX',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
