# Overview

JSMaster is an interactive JavaScript learning platform designed specifically for absolute beginners with no prior programming experience. The application now features a comprehensive curriculum with 70+ progressive challenges that teach concepts first, then provide hands-on tasks. Each challenge builds upon previous knowledge with clear explanations, hints, and step-by-step guidance. The platform includes an interactive code editor, real-time challenge system, and structured learning path from absolute basics to working with arrays and objects.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React 18 and TypeScript, utilizing a modern component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, ensuring accessibility and consistent design patterns.

**Key architectural decisions:**
- **Single Page Application (SPA)**: Uses wouter for lightweight client-side routing, reducing bundle size compared to React Router
- **Component Structure**: Organized into reusable UI components (`/components/ui/`) and feature-specific components (`/components/`)
- **Styling**: Tailwind CSS with CSS custom properties for theming, allowing for consistent design tokens and easy theme switching
- **State Management**: React Query for server state management, providing caching, synchronization, and background updates

## Backend Architecture
The server follows a REST API pattern built with Express.js and TypeScript. The architecture emphasizes simplicity and maintainability with clear separation of concerns.

**Key architectural decisions:**
- **Express.js Framework**: Lightweight and flexible web framework for rapid development
- **In-Memory Storage**: Currently uses a memory-based storage implementation for development, designed with an interface pattern to easily swap for database persistence
- **TypeScript**: Full type safety across the entire backend codebase
- **Middleware Pattern**: Structured request/response handling with logging and error handling middleware

## Data Storage Solutions
The application uses a flexible storage abstraction layer that currently implements in-memory storage but is designed to support database persistence.

**Database Schema Design:**
- **Users**: Basic user management with username and email
- **Lessons**: Structured curriculum content with level progression
- **Challenges**: Interactive coding exercises with validation
- **Projects**: Comprehensive coding projects with multiple objectives
- **UserProgress**: Tracks individual learning progress and completion status

**Data Relationships:**
- Users can have multiple progress records
- Content is organized by difficulty levels (1-4 for beginner progression)
- Challenges and projects are categorized by learning level

## External Dependencies

**Frontend Dependencies:**
- **React Ecosystem**: React 18, React DOM, and React development tools
- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod for validation
- **Utility Libraries**: clsx and tailwind-merge for conditional styling

**Backend Dependencies:**
- **Web Framework**: Express.js for HTTP server and routing
- **Database**: Neon Database (Postgres) with Drizzle ORM for type-safe database operations
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds
- **Validation**: Zod for runtime type validation and schema generation

**Development Tools:**
- **Build System**: Vite for frontend bundling and development server
- **TypeScript**: Full-stack type safety with shared type definitions
- **Database Migration**: Drizzle Kit for schema management and migrations
- **Development Environment**: Replit integration with specialized plugins for cloud development

**Third-Party Integrations:**
- **Neon Database**: Serverless Postgres database for production data persistence
- **Replit Platform**: Cloud development environment with specialized tooling and deployment