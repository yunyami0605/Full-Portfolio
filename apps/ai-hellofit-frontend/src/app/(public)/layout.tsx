// app/(public)/layout.tsx
import { BaseLayout } from "@my/ui";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
