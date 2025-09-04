# San Diego Classic Car Detail

A Next.js website for professional classic car detailing services in San Diego.

## Features

- Modern, responsive design built with Next.js 14
- Styled with Tailwind CSS for clean, minimalist aesthetics
- App Router architecture for optimal performance
- Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.js        # Root layout component
│   └── page.js          # Home page component
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies and scripts
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Customization

The website is designed with a clean, monochromatic aesthetic. You can customize:

- Colors in `tailwind.config.js`
- Content in `app/page.js`
- Styling in `app/globals.css`
- Layout in `app/layout.js`
