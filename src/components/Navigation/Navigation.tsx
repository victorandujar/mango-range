"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EXERCISE_LIST } from "@/config/exercises";
import { ARIA_CURRENT_PAGE } from "@/constants/aria";
import { UI_TEXTS } from "@/constants/texts";
import { classNames } from "@/utils/classNames";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav aria-label={UI_TEXTS.navigation.label}>
      <ul className="flex gap-6">
        {EXERCISE_LIST.map(({ href, title }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? ARIA_CURRENT_PAGE : undefined}
                className={classNames(
                  "text-sm underline-offset-8 transition-colors",
                  isActive
                    ? "font-semibold text-neutral-900 underline"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
