<div align="center">

# 🎨 Codify Frontend

### Modern React Application with Vite & Beautiful UI

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)

</div>

---

## ✨ Overview

The **Codify Frontend** is a sleek, responsive React application that provides an intuitive interface for repository management and user interaction. Built with modern web technologies and optimized for performance.

## 🎯 Key Features

### 🚀 **Performance & Development**
- ⚡ **Vite** - Lightning fast build tool with HMR
- 🔥 **React 18** - Latest React features and optimizations
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - GitHub-inspired dark theme

### 🧩 **Components Architecture**
- 🔐 **Authentication** - Login/Signup forms with validation
- 📊 **Dashboard** - Repository overview and activity feed
- 📦 **Vault Creation** - Interactive repository setup
- 👤 **User Profile** - Customizable user information
- 🧭 **Navigation** - Intuitive routing and navigation

### 🎨 **Styling & UX**
- 🌙 **Dark Theme** - Eye-friendly GitHub-inspired design
- ✨ **Smooth Animations** - Polished user interactions
- 📐 **Component-based CSS** - Modular and maintainable styles
- 🎯 **Primer React** - GitHub's design system integration

## 🏗️ Project Structure

```
frontend/
├── 📁 public/
│   └── vite.svg
├── 📁 src/
│   ├── 📁 assets/          # Static assets
│   │   ├── github-mark-white.svg
│   │   └── react.svg
│   ├── 📁 components/      # React components
│   │   ├── 📁 auth/        # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── auth.css
│   │   ├── 📁 dashboard/   # Dashboard components
│   │   │   ├── Dashboard.jsx
│   │   │   └── dashboard.css
│   │   ├── 📁 repo/        # Repository components
│   │   │   ├── RepoView.jsx
│   │   │   └── repo.css
│   │   ├── 📁 user/        # User profile components
│   │   │   ├── Profile.jsx
│   │   │   └── profile.css
│   │   ├── 📁 vault/       # Repository creation
│   │   │   ├── NewVault.jsx
│   │   │   └── NewVault.css
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── navbar.css
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global app styles
│   ├── authContext.jsx     # Authentication context
│   ├── Routes.jsx          # Application routing
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0+
- npm or yarn

### Development Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server with HMR |
| `npm run build` | 🏗️ Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Run ESLint checks |

## 🎨 Component Overview

### 🔐 Authentication Components
```jsx
// Login & Signup forms with validation
<Login />
<Signup />
```

### 📊 Dashboard
```jsx
// Main user dashboard with repositories
<Dashboard />
```

### 📦 Vault Management
```jsx
// Repository creation interface
<NewVault />
<RepoView />
```

### 👤 User Interface
```jsx
// User profile and settings
<Profile />
<Navbar />
```

## ⚙️ Configuration

### Vite Configuration
The project uses a custom Vite configuration for optimal development experience:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### ESLint Configuration
Modern ESLint setup with React-specific rules for code quality.

## 🎯 Development Guidelines

### 🏗️ **Component Structure**
- Use functional components with hooks
- Implement proper prop validation
- Follow component-based CSS architecture

### 🎨 **Styling Conventions**
- Use CSS modules for component-specific styles
- Follow BEM naming convention
- Maintain consistent spacing and typography

### 🔄 **State Management**
- Use React Context for global state
- Implement proper error boundaries
- Handle loading states gracefully

## 🛠️ Tech Stack Details

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.0+ |
| **Vite** | Build Tool | 4.0+ |
| **React Router** | Client-side Routing | Latest |
| **CSS3** | Styling | Modern features |
| **ESLint** | Code Quality | Latest |

## 🔮 Future Enhancements

- [ ] TypeScript migration
- [ ] Storybook integration
- [ ] Unit testing with Vitest
- [ ] PWA capabilities
- [ ] Advanced animations with Framer Motion
- [ ] Accessibility improvements (WCAG 2.1)

## 🤝 Contributing

1. Follow the existing code style
2. Write clear, descriptive commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

This frontend is part of the Codify project and follows the same MIT License.

---

<div align="center">

### 🎨 Built with modern web technologies for the best developer experience

**Part of the [Codify](../README.md) project**

</div>
