# Portfolio - Ammad Iftikhar

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark/light theme toggle, and a clean, professional design.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Theme**: Toggle with localStorage persistence
- **Smooth Animations**: Powered by Framer Motion
- **Interactive Components**: Filterable projects, animated skills, timeline
- **Contact Form**: Client-side validation with animated feedback
- **Performance Optimized**: Lazy loading, intersection observers
- **Accessibility**: WCAG compliant with keyboard navigation
- **SEO Ready**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations and micro-interactions
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form and info
│   ├── Experience.tsx  # Work experience timeline
│   ├── FloatingShapes.tsx # Hero background animations
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Landing section
│   ├── Navbar.tsx      # Navigation header
│   ├── Projects.tsx    # Projects showcase
│   ├── ProjectModal.tsx # Project detail modal
│   └── Skills.tsx      # Skills visualization
├── data/               # Static data
│   └── siteData.json   # Site content and configuration
├── hooks/              # Custom React hooks
│   ├── useIntersectionObserver.ts
│   └── useTheme.ts
├── App.tsx             # Main app component
├── index.css           # Global styles and Tailwind imports
└── main.tsx            # React DOM entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6 → #172554)
- **Accent**: Purple (#8B5CF6 → #2E1065)  
- **Neutrals**: Gray (#F9FAFB → #030712)
- **Status**: Success, Warning, Error variants

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: Responsive sizing with proper line heights

### Animations
- **Entrance**: Staggered fade/slide effects
- **Interactions**: Hover states and micro-animations
- **Accessibility**: Respects `prefers-reduced-motion`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-ammad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📝 Content Management

### Adding Projects
Edit `src/data/siteData.json` to add new projects:

```json
{
  "id": 5,
  "name": "Project Name",
  "category": "Web Application", 
  "stack": ["React.js", "TypeScript", "Tailwind CSS"],
  "summary": "Brief project description",
  "image": "https://example.com/image.jpg",
  "features": ["Feature 1", "Feature 2"],
  "github": "https://github.com/username/repo",
  "demo": "https://demo-link.com"
}
```

### Updating Skills
Modify the `skills` object in `siteData.json`:

```json
{
  "skills": {
    "Category Name": [
      { "name": "Skill Name", "level": 9 }
    ]
  }
}
```

### Contact Information
Update contact details in `siteData.json`:

```json
{
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1-234-567-8900",
    "location": "Your City, Country",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "resume": "/path/to/resume.pdf"
  }
}
```

## 🎯 Performance Optimization

- **Code Splitting**: Components loaded on demand
- **Image Optimization**: Lazy loading with proper alt text
- **Bundle Size**: Tree shaking and minimal dependencies
- **Lighthouse Scores**: 90+ across all metrics

## ♿ Accessibility Features

- **Semantic HTML**: Proper landmarks and structure
- **Keyboard Navigation**: Full tab-index support
- **ARIA Labels**: Screen reader friendly
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Animation preferences respected

## 🚀 Deployment

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push 'dist' contents to gh-pages branch
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Contact

**Ammad Iftikhar**
- Email: ammadiftikhar07@gmail.com
- GitHub: [@ammadiftikhar](https://github.com/ammadiftikhar)
- LinkedIn: [ammadiftikhar](https://linkedin.com/in/ammadiftikhar)

---

Built with ❤️ using React and modern web technologies.