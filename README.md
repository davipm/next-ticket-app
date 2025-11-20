# Next.js Ticket App

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nextjs,tailwind,prisma,postgres,docker)](https://skillicons.dev)
</div>

A full-stack ticket management application built with a modern, type-safe tech stack. It allows users to create, view, update, and delete tickets, demonstrating a robust and scalable architecture.

## About The Project

This project is a practical example of a full-stack application using Next.js with the App Router. It features end-to-end type safety thanks to oRPC and Prisma, providing a seamless development experience. The application is designed to be a reference for building modern web applications with a focus on best practices and a great developer experience.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **API Layer**: [oRPC](https://orpc.vercel.app/) for end-to-end type-safety.
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via Docker)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/)
-   **Validation**: [Zod](https://zod.dev/)
-   **Linting & Formatting**: [Biome](https://biomejs.dev/)
-   **Containerization**: [Docker](https://www.docker.com/)

## Project Structure

The project is organized as a monolithic application with a clear separation of concerns:

-   `app/`: Contains all the routes and UI for the Next.js App Router.
-   `app/api/rpc/[[...rest]]/route.ts`: The single entry point for the oRPC API.
-   `components/`: Shared React components used throughout the application.
-   `constants/`: Application-wide constants.
-   `hooks/`: Custom React hooks for data fetching and more.
-   `lib/`: Shared library code, including type definitions and utility functions.
-   `prisma/`: Prisma schema, migrations, and generated client.
-   `server/`: Server-side logic, including the oRPC router and Prisma client instance.
-   `utils/`: Utility functions.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version 20 or later)
-   [npm](https://www.npmjs.com/) (version 10 or later recommended)
-   [Docker](https://www.docker.com/get-started)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd next-ticket-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your database connection string:
    ```.env
    DATABASE_URL="postgresql://user:password@localhost:5432/next-ticket-app"
    ```

4.  **Start the database:**
    Run the following command to start a PostgreSQL container:
    ```bash
    docker-compose up -d
    ```

5.  **Apply database migrations:**
    ```bash
    npm run db:migrate
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the code using Biome.
-   `npm run format`: Formats the code using Biome.
-   `npm run db:migrate`: Applies database migrations.
-   `npm run db:pull`: Pulls the database schema from the database.
-   `npm run db:generate`: Generates the Prisma client.
-   `npm run db:studio`: Opens Prisma Studio.
-   `npm run db:seed`: Seeds the database with initial data.

## Deployment

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new). The `package.json` is already configured with the necessary scripts for a seamless deployment. For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
