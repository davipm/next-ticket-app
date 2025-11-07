# Next.js Ticket App

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)

A simple, full-stack ticket management application built with a modern tech stack. It allows users to create, view, update, and delete tickets in a type-safe manner from end to end.

## Stack

This project is a monorepo built with Turborepo and showcases a variety of modern web development technologies:

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **API Layer**: [oRPC](https://orpc.vercel.app/) for end-to-end type-safety.
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: [SQLite](https://www.sqlite.org/index.html)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/)
-   **Validation**: [Zod](https://zod.dev/)
-   **Monorepo Manager**: [Turborepo](https://turbo.build/)

## Project Structure

This repository is a monorepo, organized into `apps` and `packages`.

-   `apps/web`: The main Next.js web application. This is the user-facing part of the project.
-   `packages/api`: A dedicated package for the API layer, built with oRPC. It defines the procedures that the frontend can call.
-   `packages/db`: Manages the database schema using Prisma and exports the Prisma Client for use in other packages.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version 20 or later)
-   [npm](https://www.npmjs.com/) (version 10 or later recommended)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd next-ticket-app
    ```

2.  **Install dependencies:**
    From the root of the project, run:
    ```bash
    npm install
    ```

3.  **Set up the database:**
    Apply the database migrations to create the necessary tables.
    ```bash
    npm run db:migrate
    ```
    This command uses Turborepo to run the `prisma migrate dev` command in the `packages/db` workspace.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Next.js development server for the `web` app.

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](httpshttps://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
