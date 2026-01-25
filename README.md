# Amlesh Kumar - Portfolio Website

A modern, professional portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, futuristic design with glassmorphism effects
- **Dark/Light Theme**: Smooth animated theme toggle with localStorage persistence
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth Framer Motion animations throughout
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessible**: ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Shadcn/ui** components

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Main navigation with smooth scrolling
│   ├── Hero.tsx        # Hero section with profile photo
│   ├── Skills.tsx      # Skills showcase with progress bars
│   ├── Education.tsx   # Education timeline and details
│   ├── Projects.tsx    # Projects gallery with modal details
│   ├── Contact.tsx     # Contact form and information
│   ├── Footer.tsx      # Footer with quick links
│   ├── ThemeToggle.tsx # Dark/light theme switcher
│   └── FloatingHireMe.tsx # Floating hire me button
├── assets/             # Static assets
│   └── profile.png     # Profile photo
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── index.css          # Global styles and design system
```

## 🎨 Design System

The portfolio uses a comprehensive design system defined in `src/index.css`:

- **Colors**: Deep blue primary (#0b3d91) and cyan accent (#00d4ff)
- **Typography**: Inter font family with multiple weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Glassmorphism effects with backdrop blur
- **Animations**: Custom CSS animations and Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amlesh-portfolio
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
   Navigate to `http://localhost:8080`

## 📝 Customization Guide

### 1. Replace Profile Photo

- Replace `src/assets/profile.png` with your own high-quality photo
- Recommended size: 400x400px or larger
- Formats: PNG, JPG, or WebP

### 2. Add Your Resume

- Save your resume as `Amlesh_Kumar_Resume.pdf`
- Place it in the `public/` folder
- The download button will automatically work

### 3. Update Personal Information

Edit the following files to customize content:

- **Hero Section**: `src/components/Hero.tsx`
- **Skills**: `src/components/Skills.tsx`
- **Education**: `src/components/Education.tsx`
- **Projects**: `src/components/Projects.tsx`
- **Contact**: `src/components/Contact.tsx`

### 4. Social Media Links

Update social media URLs in:
- `src/components/Hero.tsx` (hero social links)
- `src/components/Contact.tsx` (contact social links)

### 5. Contact Information

Update contact details in `src/components/Contact.tsx`:
- Email address
- Phone number
- Location
- Social media profiles

### 6. SEO and Meta Tags

Update `index.html`:
- Page title
- Meta description
- Open Graph tags
- Favicon

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components load as needed
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Assets**: Compressed images and minified CSS/JS
- **Lighthouse Score**: Optimized for 90+ Lighthouse scores

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to your web server

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Theme Customization

The design system can be customized in `src/index.css`:

- **Colors**: Update CSS variables for primary, accent, and neutral colors
- **Typography**: Change font families and sizes
- **Spacing**: Modify spacing scale
- **Animations**: Adjust animation durations and easing

## 📱 Mobile Responsiveness

The portfolio is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized typography scales
- Collapsible navigation menu

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion`

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and formats
2. **Animations not working**: Verify Framer Motion installation
3. **Theme not persisting**: Check localStorage permissions
4. **Build errors**: Clear `node_modules` and reinstall

### Getting Help

- Check the browser console for errors
- Verify all dependencies are installed
- Ensure Node.js version is 18 or higher

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find bugs or have suggestions, please open an issue or submit a pull request.

## 📞 Support

If you need help customizing this portfolio or have questions:
- Open an issue on GitHub
- Contact: amleshkumar@example.com

---

Built with ❤️ by Amlesh Kumar using React, TypeScript, and Tailwind CSS.