# AGENT.md - AK Solutions Website

## Build/Test Commands
- **No build system**: Static HTML/CSS/JS website, no package.json or build tools
- **Test locally**: Open index.html in browser or use live server
- **Deploy**: Copy files to web server (currently deployed to aksolutions.fr)

## Architecture & Structure
- **Static website**: HTML5, CSS3, JavaScript (no framework)
- **Dependencies**: Bootstrap 5.3.2, AOS animations, Bootstrap Icons
- **Service Worker**: sw.js for caching (cache-first strategy)
- **Key files**: index.html (main), style.css (styles), script.js (interactions)
- **Assets**: img/ (WebP images), fonts/ (Nunito font), css/ (font definitions)

## Code Style & Conventions
- **HTML**: Semantic HTML5, French content, accessibility attributes
- **CSS**: CSS Custom Properties (--bs-primary, --electric-blue), BEM-like naming
- **JavaScript**: ES6+, event-driven, modular functions, requestIdleCallback for performance
- **Colors**: Electric Blue (#007FFF) primary, Dark Orange (#FF8C00) secondary
- **Responsive**: Bootstrap grid system, mobile-first approach
- **Animations**: AOS library for scroll animations, smooth transitions

## Performance Optimizations
- **Lazy loading**: Images with loading="lazy"
- **Preconnect**: DNS prefetch for external resources
- **Deferred JS**: Scripts loaded with defer attribute
- **CSS inlining**: Critical CSS inlined in head
- **WebP images**: Optimized image format
- **Service Worker**: Caching strategy for static assets
