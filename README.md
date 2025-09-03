# User API Dashboard

A modern, animated user management dashboard built with Next.js 15, featuring beautiful GSAP animations, component-based architecture, and real-time user data from JSONPlaceholder API.

## ✨ Features

- **🎨 Modern UI Design**: Dark theme with purple/blue gradient color scheme
- **🚀 GSAP Animations**: Smooth entrance animations, hover effects, and interactive elements
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔍 Real-time Search**: Filter users by name, email, username, or company
- **📄 Pagination**: Efficient user list navigation with animated page controls
- **🏗️ Component Architecture**: Modular, reusable components for maintainability
- **⚡ Performance Optimized**: Built with Next.js 15 and Turbopack for fast development
- **🎯 Type Safety**: Full TypeScript implementation with proper type definitions

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Primitive components for complex UI patterns
- **Lucide React** - Beautiful icon library

### Animation & Interaction

- **GSAP 3.13.0** - Professional-grade animation library
- **@gsap/react** - React-specific GSAP utilities

### Data Management

- **TanStack Query (React Query)** - Powerful data fetching and caching
- **JSONPlaceholder API** - Mock REST API for user data

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd user_api
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
user_api/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard layout and pages
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── page.tsx            # Dashboard home page
│   │   └── users/              # Users feature
│   │       ├── page.tsx        # Users listing page
│   │       └── [id]/           # Dynamic user detail route
│   │           └── page.tsx    # Individual user page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── ui/                     # Shadcn/ui components
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── user-detail/            # User detail specific components
│       ├── UserHeader.tsx      # User page header
│       ├── UserProfileCard.tsx # User profile information
│       ├── AddressCard.tsx     # User address display
│       ├── CompanyCard.tsx     # Company information
│       └── QuickActionsCard.tsx # Action buttons
├── hooks/                      # Custom React hooks
│   └── useUsers.ts            # User data fetching hooks
├── lib/                       # Utility functions
│   └── utils.ts              # Helper functions
└── public/                   # Static assets
```

## 🎯 Key Features Breakdown

### User Management Dashboard

- **Users Listing**: Grid layout with search and pagination
- **User Details**: Individual user profile with comprehensive information
- **Real-time Search**: Filter users across multiple fields
- **Responsive Design**: Works seamlessly on all device sizes

### Animation System

- **Page Transitions**: Smooth entrance animations using GSAP
- **Hover Effects**: Interactive card animations with scale and shadow effects
- **Staggered Animations**: Sequential element animations for visual appeal
- **Micro-interactions**: Button hover states, icon rotations, and sparkle effects

### Component Architecture

- **Modular Design**: Separated user detail page into individual components
- **Reusable Components**: Shared UI components across the application
- **Type Safety**: Proper TypeScript interfaces for all components
- **Performance Optimized**: Efficient re-rendering with React Query caching

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build the application for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint for code quality
```

## 🎨 Customization

### Theme Colors

The project uses a purple/blue gradient theme. You can customize colors in:

- `tailwind.config.js` - Global color scheme
- Component styles - Individual component theming

### Animations

GSAP animations can be customized in:

- `components/user-detail/` - Individual component animations
- `app/dashboard/users/page.tsx` - Users listing animations

### API Integration

Currently using JSONPlaceholder API. To integrate with your own API:

1. Update the fetch URLs in `hooks/useUsers.ts`
2. Modify the User interface if your data structure differs
3. Update error handling as needed

## 🌟 Performance Features

- **Turbopack**: Fast development builds and hot reloading
- **React Query**: Intelligent caching and background updates
- **Code Splitting**: Automatic bundle optimization
- **Image Optimization**: Next.js built-in image optimization
- **Static Generation**: Pre-rendered pages where possible

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## 📧 Support

If you have any questions or run into issues, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Built with ❤️ using Next.js 15, GSAP, and modern web technologies.**
