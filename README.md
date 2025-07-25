![](/img.png)

# Next.js Ticket Application

This is a full-stack ticket management application built with Next.js, Prisma, and a PostgreSQL database. It allows users to create, view, edit, and delete tickets.

## Features

- **Create, Read, Update, Delete (CRUD)** functionality for tickets.
- **View all tickets** in a centralized list.
- **Filter and sort** tickets by priority, category, and status.
- **User-friendly interface** with a clean and modern design.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [React Query](https://tanstack.com/query/v4)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/next-ticket-app.git
   cd next-ticket-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Create a PostgreSQL database.
   - Create a `.env` file in the root of the project and add your database connection string:

     ```
     DATABASE_URL="postgresql://user:password@host:port/database"
     ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code.

## Project Structure

```
/
├── app/                # Next.js App Router pages
│   ├── api/            # API routes
│   ├── (components)/   # Page-specific components
│   └── (models)/       # Database models
├── components/         # Shared UI components
├── lib/                # Helper functions and utilities
├── prisma/             # Prisma schema and migrations
└── public/             # Static assets
```
