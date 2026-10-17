import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { Navigation } from "@/components/Navigation";

export const Header = () => (
  <header className="border-b border-neutral-200">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
      <Link href={ROUTES.home} className="text-lg font-semibold tracking-tight">
        {SITE_CONFIG.name}
      </Link>
      <Navigation />
    </div>
  </header>
);
