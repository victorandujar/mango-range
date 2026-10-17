# AGENTS.md

Guidelines for working on this repository. They apply to any contributor, human or AI assisted.

## Project

Next.js (App Router) application that implements a custom `<Range />` component with two modes:

- `/exercise1`: normal range between a min and a max value.
- `/exercise2`: fixed range limited to a list of values.

Stack: Next.js, React, TypeScript (strict), Tailwind CSS, Jest, React Testing Library, ESLint,
Prettier, Husky, lint-staged and commitlint.

## Development

Use the Node.js version declared in `.nvmrc`.

```bash
npm i
npm run dev
```

The app runs on `http://localhost:8080`. Production build: `npm run build` and `npm start` (also on
port 8080).

## Git workflow

For every feature or code change:

1. Start from an up-to-date `main` branch.
2. Create a branch named `feature/<short-kebab-case-description>` from `main` before editing files.
3. Implement and verify the change only on that feature branch. Never develop directly on `main`.
4. Push the feature branch and integrate it into `main` through a pull request.

`main` only receives changes by merging already validated feature branches.

## Commits

- Follow Conventional Commits (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`...), with an
  optional scope: `feat(range): ...`. commitlint enforces it on every commit.
- Write the subject in English, in the imperative mood and in lowercase.
- Commits must be atomic: one coherent change per commit, complete and working on its own.
- Group the files that belong to the same change, including their tests. Avoid both huge commits
  that mix unrelated changes and one commit per file.
- Never commit unrelated worktree changes.

## Task completion

Before declaring any task complete, always:

1. Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.
2. Create atomic commits, separating independent changes.
3. Push the feature branch.

Do not report a task as complete until verification, atomic commits and the push have succeeded. If
any step is blocked, report the blocker explicitly instead.

## Code principles

- Apply SOLID, KISS, DRY and YAGNI. Prefer the simplest solution that solves the current
  requirement; do not add code, options or abstractions that nothing uses yet.
- Each file has a single responsibility. Split a file when it starts doing more than one thing.
- No magic numbers or magic strings anywhere: logic, components, pages, layouts or route handlers.
  Every value with a meaning lives in a constants or config file and is referenced by name:
  - Constants (`constants.ts`, `src/constants/`): fixed values such as limits, steps, keys, status
    codes, messages, accessible labels and UI texts, as `as const` objects with descriptive names
    (`ERROR_MESSAGES`, `HTTP_STATUS`, `RANGE_CONSTRAINTS`, `THUMBS`...).
  - Config (`config.ts`, `src/config/`): values that set up the application or a feature, such as
    site metadata, routes, navigation items or formatting options.
  - Repeated elements (thumbs, labels, links, outputs...) are declared once as arrays or objects in
    those files and rendered with `map`.
  - Only language syntax is exempt: TypeScript types, `typeof` checks and Tailwind classes.
  - Tests may use literal values as scenario data. Labels, ids and texts shared between tests go to
    a test config file inside a `testing/` folder.
- Modules start with their imports and their main code. Do not declare lists of constants or helper
  functions at the top of services, routes or components; move them to constants, utils or
  validators files.
- Prefer pure functions for logic so it can be tested in isolation.
- Use TypeScript strictly: no `any`, no non-null assertions and type imports with `import type`.
- Use descriptive English names. Do not abbreviate.
- Comment only when the reason behind the code is not obvious. Never comment what the code already
  says.

## Project structure

```
src/
├── app/            Routes, layouts and route handlers (app/api)
├── components/     UI components, one folder per component
├── config/         Application configuration (site metadata, routes, formatting)
├── constants/      Global constants (messages, HTTP status, constraints)
├── lib/            Framework-specific helpers (e.g. lib/api for route handlers)
├── mocks/          Mocked data sources
├── services/       Data access, server only
├── types/          Shared domain types
├── utils/          Generic pure helpers
└── validators/     Domain validation rules
```

Components follow the same separation inside their own folder:

```
components/Range/
├── Range.tsx       Presentation only
├── components/     Subcomponents used only by Range
├── hooks/          State and behaviour (custom hooks)
├── constants.ts    Constants scoped to the component
├── testing/        Test config and helpers shared by the component tests
├── types.ts        Types scoped to the component
└── utils/          Pure helpers scoped to the component
```

Code used by a single component stays inside that component's folder. Move it to `src/` only when a
second consumer needs it.

## Components

- Components render; hooks hold state and behaviour. Keep business logic out of JSX.
- Use Server Components by default. Add `"use client"` only to the components that need state,
  effects or browser events, as low in the tree as possible.
- Components must be accessible: semantic roles, ARIA attributes, keyboard support and visible
  focus.

## Styling

- Use Tailwind CSS utility classes only.
- `src/app/globals.css` contains only `@import "tailwindcss";`. Do not add other CSS files, CSS
  Modules or inline styles, except inline styles for values computed at runtime (e.g. a thumb
  position).
- Let Prettier sort the Tailwind classes.

## Data fetching

- Pages fetch their data on the server through `src/services`, which are marked as `server-only`.
- Route handlers under `app/api` expose the same services over HTTP using `createJsonRoute`.
- Never call the application's own API routes over HTTP from the server.
- Validate data at the service boundary with the validators before it reaches the UI.

## Testing

- Every feature ships with its tests in the same commit.
- Test files live next to the code they test: `name.test.ts` or `name.test.tsx`.
- Write tests in English with the Gherkin structure, nesting `describe` and `it`:

  ```ts
  describe("Given a range from 1 to 100 with a selection from 20 to 80", () => {
    describe("When the min thumb is moved past the max thumb", () => {
      it("Then the min thumb should stop at the max thumb value without crossing it", () => {
        // ...
      });
    });
  });
  ```

- Descriptions must explain the scenario and the expected behaviour, including concrete values.
- Test behaviour, not implementation details. Query the DOM by role, label or text.
- Cover the edge cases of every rule: limits, equal values and invalid input.
- Route handler tests run in the Node environment (`@jest-environment node`).

## README

The README contains only technical information: requirements, installation, scripts, routes and how
to run the tests. Do not explain architecture, framework or product decisions in it.

## Documentation

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- Testing Library: https://testing-library.com/docs/react-testing-library/intro
