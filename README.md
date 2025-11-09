# Convergent

AI-powered matchmaking platform connecting tech companies with university researchers for high-impact R&D collaborations.

## Features

- 🔍 **Smart Search**: Find researchers by expertise, institution, and research area
- 🎯 **Match Scoring**: Rule-based algorithm to match company needs with researcher expertise
- 📊 **Comprehensive Profiles**: View h-index, citations, publications, and research topics
- 🎨 **Beautiful UI**: Chime-inspired design with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Source**: OpenAlex API

## Getting Started

### Development

1. Install dependencies:
```bash
npm install --cache /tmp/npm-cache
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create a production build:
```bash
npm run build
npm start
```

### Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Deploy - no additional configuration needed!

Alternatively, you can deploy to any Node.js hosting platform that supports Next.js.

## Project Structure

```
convergent/
├── app/
│   ├── page.tsx              # Landing page
│   ├── search/               # Search results
│   ├── researcher/[id]/      # Researcher profile
│   └── api/                  # API routes
├── components/               # Reusable UI components
├── lib/                      # Utilities and API clients
└── types/                    # TypeScript type definitions
```

## OpenAlex API

This project uses the [OpenAlex API](https://docs.openalex.org/) to fetch researcher data, publications, and academic information. No API key is required.

## License

MIT

