# Next.js Ticket App

A simple ticket management application built with Next.js. It allows users to create, view, update, and delete tickets.

## Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Database**: [SQLite](https://www.sqlite.org/index.html)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/)
-   **Validation**: [Zod](https://zod.dev/)

## Project Structure

The project follows a feature-based structure.

-   `app/`: Contains the application pages and routes.
    -   `app/tickets`: The main feature directory for ticket management.
        -   `_components`: React components specific to tickets (e.g., forms, lists).
        -   `_constants`: Constants used in the tickets feature.
        -   `_services`: Server-side actions and data fetching logic using Prisma.
        -   `_types`: TypeScript types and Zod schemas for validation.
        -   `edit/[id]`: Page for editing a specific ticket.
        -   `new`: Page for creating a new ticket.
-   `components/`: Shared UI components used across the application.
-   `lib/`: Utility functions and library initializations (e.g., Prisma client).
-   `prisma/`: Contains the Prisma schema (`schema.prisma`), database migrations, and the SQLite database file (`dev.db`).
-   `public/`: Static assets like images and fonts.
-   `providers/`: React context providers for the application.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version 20 or later)
-   [npm](https://www.npmjs.com/) or your favorite package manager.

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

3.  **Set up the database:**
    Apply the database migrations to create the necessary tables.
    ```bash
    npx prisma migrate dev
    ```
    This will also generate the Prisma Client based on your schema.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.