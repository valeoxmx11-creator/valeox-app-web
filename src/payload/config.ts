import path from 'node:path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { env } from '@/shared/config/env';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Leads } from './collections/Leads';
import { Projects } from './collections/Projects';
import { ProjectImpacts } from './collections/ProjectImpacts';
import { KpiAggregates } from './collections/KpiAggregates';
import { Categories } from './collections/Categories';
import { Posts } from './collections/Posts';
import { CtaEvents } from './collections/CtaEvents';
import { SiteSettings } from './globals/SiteSettings';

export default buildConfig({
  secret: env.PAYLOAD_SECRET,
  serverURL: env.PAYLOAD_PUBLIC_SERVER_URL || env.NEXT_PUBLIC_APP_URL,
  cors: env.PAYLOAD_CORS_ORIGINS.length > 0 ? env.PAYLOAD_CORS_ORIGINS : [env.NEXT_PUBLIC_APP_URL],
  csrf: env.PAYLOAD_CSRF_ORIGINS.length > 0 ? env.PAYLOAD_CSRF_ORIGINS : [env.NEXT_PUBLIC_APP_URL],
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Leads,
    Projects,
    ProjectImpacts,
    KpiAggregates,
    Categories,
    Posts,
    CtaEvents,
  ],
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
