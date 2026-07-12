# iFind

A fully-featured e-commerce web application built with **standalone Angular 19** components, supporting end-to-end shopping workflows including product browsing, search and filtering, cart management, checkout, and wishlist functionality.

🔗 **Live Demo:** [iFind](https://i-find-j2blx5erg-hamsa-ragheb-s-projects.vercel.app)

## Features

- **Authentication** — sign-up, sign-in, forgot/reset/update password, and email-based reset code verification
- **Multilingual Support** — full Arabic/English localization (i18n) backed by a dedicated NgRx language store
- **Theme System** — light/dark mode toggle, persisted in `localStorage` and applied globally via CSS custom properties and a `[data-theme]` attribute, with smooth transitions across the UI
- **Shopping Experience** — product browsing, product details, search and category filtering, cart, checkout, and wishlist
- **Route Protection** — Auth and User guards securing private routes
- **Global HTTP Layer** — interceptors for auth token injection, centralized error handling, and loading spinner state
- **Reusable Component Library** — shared header, navbar, footer, banner, slider, category sidebar, welcome popup, and scroll-to-top components

## Tech Stack

| Category         | Technology                          |
|-------------------|--------------------------------------|
| Framework         | Angular 19 (Standalone Components)  |
| Language          | TypeScript                          |
| State Management  | NgRx (actions, effects, reducers, selectors) |
| Styling           | CSS3, custom theming via CSS variables |
| Localization      | Angular i18n                        |
| Notifications     | SweetAlert2                         |

## Architecture

The project follows a modular, standalone-component architecture organized by domain:

```
src/app/
├── Components/
│   ├── Auth/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forget-password/
│   │   ├── reset-password/
│   │   ├── verify-reset-code/
│   │   └── update-password/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── product-details/
│   ├── profile/
│   ├── search/
│   ├── slider/
│   ├── welcome-popup/
│   ├── wishlist/
│   └── Shared/
│       ├── banner/
│       ├── category-sidebar/
│       ├── footer/
│       ├── header/
│       ├── navbar/
│       ├── product/
│       └── scroll-to-top/
├── Guards/                 # auth.guard.ts, user.guard.ts — route protection
├── Interceptors/           # auth, error, and spinner interceptors
├── Models/                 # auth, cart, category, product, product-detail, wishlist
├── Pipes/                  # search.pipe.ts, search-by-category.pipe.ts
├── Services/                # auth, cart, category, category-sidebar, products,
│                            # search, sweet-alert, theme, wishlist
└── Store/
    └── language/            # NgRx store: actions, effects, reducer, selector
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Angular CLI](https://angular.dev/tools/cli) v19+

### Installation

```bash
git clone https://github.com/<your-username>/iFind.git
cd iFind
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload on source file changes.

### Build

```bash
ng build
```

Build artifacts are output to the `dist/` directory, optimized for production by default.

### Running Unit Tests

```bash
ng test
```

Runs unit tests via [Karma](https://karma-runner.github.io).

## Project Status

🚧 Actively developed as a personal/portfolio project.

## License

This project is open source and available for educational and portfolio purposes.
