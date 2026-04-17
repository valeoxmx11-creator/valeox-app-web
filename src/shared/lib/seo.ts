import type { Metadata } from 'next';

const baseTitle = 'VALEOX';
const defaultDescription =
  'Firma de ingeniería operativa y transformación empresarial orientada a resultados medibles.';

export const buildMetadata = (params: {
  title: string;
  description: string;
  path?: string;
}): Metadata => {
  const { title, description, path = '/' } = params;
  const url = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${path}`;

  return {
    title: `${title} | ${baseTitle}`,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description,
      url,
      siteName: baseTitle,
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${baseTitle}`,
      description,
    },
  };
};

export const defaultPublicMetadata = buildMetadata({
  title: 'Ingeniería operativa y transformación empresarial',
  description: defaultDescription,
});
