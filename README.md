# Personal Task Management System

A modern and efficient task management system built with Next.js 15, React 19, and various cutting-edge technologies. The system allows users to manage their tasks efficiently by categorizing them into projects, offering a seamless experience across devices with theme toggling and a fully responsive mobile view.

## 🚀 Features

- **Task Management**: Create, update, and delete tasks.
- **Project Categorization**: Organize tasks into different projects.
- **Optimistic Updates**: Ensure a smooth user experience with instant UI updates.
- **Theme Toggling**: Supports light and dark mode using `next-themes`.
- **Mobile Responsive**: Fully optimized for mobile and tablet devices.
- **State Management**: Uses Zustand and React Query for efficient data fetching and caching.
- **Database Integration**: PostgreSQL with Drizzle ORM for a robust backend.
- **Docker Support**: Includes a Dockerfile and Docker Compose setup for containerized deployment.

## 🛠 Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework for server-side rendering and static site generation.
- **[React 19](https://react.dev/)** - UI library for building interactive user interfaces.
- **[TanStack Query (React Query)](https://tanstack.com/query/latest)** - Data fetching, caching, and synchronization.
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript-first ORM for PostgreSQL.
- **[ShadCN](https://ui.shadcn.com/)** - Beautifully designed UI components.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for responsive design.
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme toggling for dark/light mode.

## 🌐 Live Demo

Access the project here: [Personal Task Management System](https://personal-task-management.vercel.app)

## 📌 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure your database and other required environment variables.
   ```env
   DATABASE_URL="postgres://postgres:yourpassword@localhost:5432/dbname"
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   NEXTAUTH_SECRET=YOUR_SECRET_PASSWORD
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   DB_SECRET_PASSWORD=YOUR_TOP_SECRET_PASSWORD
   DB_DBNAME=PROJECT_TASK
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🐳 Docker Support

1. **Build the Docker image:**
   ```bash
   docker build -t task-management-system .
   ```
2. **Run using Docker Compose:**
   ```bash
   docker-compose up
   ```

## 📱 Responsive Design

This application is fully optimized for mobile, tablet, and desktop views. The UI components are built using ShadCN and Tailwind CSS, ensuring a seamless experience on all devices.

## 🎨 Theme Support

The application supports dark and light themes using `next-themes`. Users can toggle between themes in the UI settings.

## 📖 License

This project is open-source and available under the [MIT License](LICENSE).
