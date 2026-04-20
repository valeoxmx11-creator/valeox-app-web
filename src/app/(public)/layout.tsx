import { PublicShell } from '@/shared/components/public/PublicShell';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
