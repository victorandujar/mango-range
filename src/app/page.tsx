import Link from "next/link";
import { EXERCISE_LIST } from "@/config/exercises";
import { SITE_CONFIG } from "@/config/site";
import { UI_TEXTS } from "@/constants/texts";

export default function Home() {
  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{SITE_CONFIG.name}</h1>
        <p className="text-neutral-600">{UI_TEXTS.home.intro}</p>
      </header>
      <ul aria-label={UI_TEXTS.home.exercisesLabel} className="grid gap-4 sm:grid-cols-2">
        {EXERCISE_LIST.map(({ href, title, subtitle, description }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex h-full flex-col gap-2 rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-900"
            >
              <span className="text-xs tracking-widest text-neutral-500 uppercase">{title}</span>
              <span className="text-lg font-semibold">{subtitle}</span>
              <span className="text-sm text-neutral-600">{description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
