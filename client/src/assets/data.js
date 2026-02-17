export const updates = [
  {
    id: 1,
    date: "March 2026",
    title: "Major UI + System Expansion",

    features: [
      {
        name: "Vision Page",
        simple: "Added a dedicated page explaining product direction and goals.",
        technical: "Built modular layout using reusable section components and responsive grid system."
      },
      {
        name: "Login Page",
        simple: "Users can now securely log in.",
        technical: "Implemented JWT-based authentication with protected route handling and token persistence."
      },
      {
        name: "Evolution Page",
        simple: "Created a public engineering progress page.",
        technical: "Structured dynamic update rendering using JSON-driven architecture and modular React components."
      },
      {
        name: "Home Page Extension",
        simple: "Expanded homepage with structured content sections.",
        technical: "Refactored layout using grid system and improved component separation for scalability."
      }
    ],

    achievement:
      "Improved system architecture thinking, dynamic rendering patterns, and modular component design."
  },

  {
    id: 2,
    date: "April 2026",
    title: "Authentication & Route Security Upgrade",

    features: [
      {
        name: "JWT Integration",
        simple: "Secure login sessions were introduced.",
        technical: "Integrated JWT authentication with backend validation and token expiration handling."
      },
      {
        name: "Protected Routes",
        simple: "Restricted access to sensitive pages.",
        technical: "Created reusable route guard component using React Context and conditional rendering."
      },
      {
        name: "Token Persistence",
        simple: "Users stay logged in across sessions.",
        technical: "Implemented localStorage token storage with secure rehydration on app initialization."
      },
      {
        name: "Logout Flow",
        simple: "Users can securely end their sessions.",
        technical: "Cleared authentication state and invalidated tokens on logout."
      }
    ],

    achievement:
      "Deepened understanding of stateless authentication, token lifecycle management, and SPA security patterns."
  },

  {
    id: 3,
    date: "May 2026",
    title: "Performance & Architecture Optimization",
    commitLink: "https://github.com/rahulpareek0203/GermanBeyondExams/commit/6826388692f2b203bd6ad0960328cff44ca02b45",

    features: [
      {
        name: "Component Refactoring",
        simple: "Improved code structure for maintainability.",
        technical: "Separated logic and UI into reusable components following single-responsibility principle."
      },
      {
        name: "Lazy Loading",
        simple: "Pages now load faster.",
        technical: "Implemented React lazy loading and dynamic imports to reduce initial bundle size."
      },
      {
        name: "State Optimization",
        simple: "Reduced unnecessary re-renders.",
        technical: "Applied memoization and optimized state management to improve performance."
      },
      {
        name: "Folder Structure Cleanup",
        simple: "Organized project structure.",
        technical: "Restructured project into scalable architecture with dedicated feature modules."
      }
    ],

    achievement:
      "Strengthened architectural thinking and improved performance optimization techniques."
  },

  {
    id: 4,
    date: "June 2026",
    title: "Deployment & DevOps Improvements",

    features: [
      {
        name: "Netlify Deployment",
        simple: "Application deployed to production.",
        technical: "Configured Netlify build settings, environment variables, and CI pipeline."
      },
      {
        name: "Environment Variables",
        simple: "Secured sensitive configuration.",
        technical: "Moved API keys and secrets to environment configuration for secure deployment."
      },
      {
        name: "Custom Domain Setup",
        simple: "Application accessible via branded domain.",
        technical: "Configured DNS records and SSL certification for secure HTTPS hosting."
      },
      {
        name: "Production Debugging",
        simple: "Resolved deployment-related issues.",
        technical: "Handled CORS issues, routing fallbacks, and build optimization errors."
      }
    ],

    achievement:
      "Gained practical experience in deployment pipelines, DNS configuration, and production debugging."
  },

  {
    id: 5,
    date: "July 2026",
    title: "User Experience & Design System Upgrade",

    features: [
      {
        name: "Dark Glass UI Theme",
        simple: "Introduced a modern dark interface.",
        technical: "Implemented glassmorphism with backdrop-filter and layered gradient backgrounds."
      },
      {
        name: "Reusable UI Components",
        simple: "Consistent design across pages.",
        technical: "Created shared button, card, and layout components for unified styling."
      },
      {
        name: "Responsive Improvements",
        simple: "Optimized layout for all devices.",
        technical: "Applied CSS Grid and media queries for adaptive multi-breakpoint design."
      },
      {
        name: "Micro Interactions",
        simple: "Added smooth hover and transition effects.",
        technical: "Implemented subtle animations using CSS transitions for improved user feedback."
      }
    ],

    achievement:
      "Improved frontend design maturity and built a consistent scalable UI system."
  }
];
