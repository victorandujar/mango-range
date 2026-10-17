# Mango Range

Custom `<Range />` component with two modes, built with Next.js (App Router) and TypeScript.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Jest and React Testing Library
- Playwright
- ESLint, Prettier, Husky, lint-staged and commitlint

## Requirements

- Node.js 20.9 or later (the version used is declared in `.nvmrc`)
- npm

## Installation

```bash
git clone https://github.com/victorandujar/mango-range.git
cd mango-range
npm i
```

## Running the project

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

Both run on [http://localhost:8080](http://localhost:8080).

## Routes

| Route                   | Description                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/`                     | Home page with links to both exercises                                        |
| `/exercise1`            | Normal range between a min and a max value                                    |
| `/exercise2`            | Fixed values range                                                            |
| `GET /api/range/normal` | Mocked service: `{ "min": 1, "max": 100 }`                                    |
| `GET /api/range/fixed`  | Mocked service: `{ "rangeValues": [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] }` |

## Testing

Unit and integration tests:

```bash
npm test
npm run test:coverage
```

End-to-end tests (the first time, install the browser with `npx playwright install chromium`):

```bash
npm run test:e2e
```

The end-to-end tests build the application and start it on port 8080. Set `E2E_PORT` to use a
different port.

## Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Starts the development server            |
| `npm run build`         | Builds the application for production    |
| `npm start`             | Starts the production server             |
| `npm run lint`          | Runs ESLint                              |
| `npm run format`        | Formats the code with Prettier           |
| `npm run format:check`  | Checks the code format                   |
| `npm run typecheck`     | Checks the TypeScript types              |
| `npm test`              | Runs the unit and integration tests      |
| `npm run test:watch`    | Runs the unit tests in watch mode        |
| `npm run test:coverage` | Runs the unit tests with coverage report |
| `npm run test:e2e`      | Runs the end-to-end tests                |
