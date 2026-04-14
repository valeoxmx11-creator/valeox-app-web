import path from 'node:path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { env } from '@/shared/config/env';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { SiteSettings } from './globals/SiteSettings';

export default buildConfig({
  secret: env.PAYLOAD_SECRET,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media],
  globals: [SiteSettings],
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URI,
    },
  }),
});
