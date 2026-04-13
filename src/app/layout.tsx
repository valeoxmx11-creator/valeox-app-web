import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'VALEOX',
  description: 'Operational engineering and business transformation platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
