# Apex Studio — Portfolio & Resume Website

A modern, responsive personal portfolio and resume website built with semantic HTML5, Tailwind CSS, Lucide Icons, and Vanilla JavaScript.

## 🧭 Page Sections & Navigation

The website is structured around four primary sections and corresponding links:

1. **Home (`#home`)**: Hero banner, core highlights, quick action buttons, and animated profile overview.
2. **Resume (`#resume`)**: Curriculum Vitae including work experience timeline, education, skills matrix (Frontend, Backend, Cloud/DevOps), certifications, and a printer-friendly PDF download button.
3. **Projects (`#projects`)**: Interactive portfolio with real-time category filtering (`All`, `Web Apps`, `SaaS`, `E-Commerce`) and preview cards.
4. **Contact (`#contact`)**: Interactive inquiry form with simulated transmission, response time guarantees, direct contact info, and floating toast notifications.

## 🚀 Features

- **Synced Navigation**: Desktop header nav, mobile drawer, and footer navigation all match the 4 primary sections: **Home**, **Resume**, **Projects**, and **Contact**.
- **Scrollspy Navigation**: Automatically highlights the active link in the navigation header as you scroll down the page.
- **Dark / Light Mode**: Instant toggle with theme persistence in `localStorage` and system color scheme detection.
- **Resume PDF Export**: Click "Download Resume PDF" to instantly open a clean, print-optimized view of the resume section.
- **Zero Build Step Required**: Works directly in any browser with zero installation needed.

## 📁 Directory Structure

```
my-website/
├── index.html       # Main HTML markup with Home, Resume, Projects, and Contact sections
├── styles.css       # Custom styles, animations, and print styles
├── main.js          # Interactive scrollspy, theme switcher, filters, resume download, and toasts
└── README.md        # Documentation
```

## 💻 Quick Start & Preview

### Open in Browser
Double-click `index.html` or open it directly in Safari, Chrome, Firefox, or Edge.

### Local Server (Optional)
```bash
python3 -m http.server 3000
# or
npx serve .
```
Then visit `http://localhost:3000`.
