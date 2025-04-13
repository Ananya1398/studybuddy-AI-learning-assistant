# Study Buddy - Frontend Component

The frontend component of Study Buddy is built using Next.js and provides a modern, responsive user interface for interacting with the video processing and AI features.

## Architecture

The frontend follows a component-based architecture with the following key features:

- **Modern Stack**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI for accessible components
- **State Management**: React hooks and context
- **API Integration**: Custom hooks for backend communication

## Key Features

### 1. Video Upload Interface
- Drag-and-drop file upload
- Progress tracking
- File type validation
- Preview capabilities

### 2. Content Display
- Transcript viewer
- Summary display
- Notes presentation
- PDF export functionality

### 3. Interactive Q&A
- Chat interface
- Real-time responses
- Context-aware suggestions
- History tracking

### 4. User Interface
- Responsive design
- Dark/light mode
- Accessible components
- Loading states
- Error handling

## Project Structure

```
study-buddy/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
└── package.json       # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Navigate to the project directory:
   ```bash
   cd frontend/study-buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

### Code Style
- Follow ESLint configuration
- Use TypeScript for type safety
- Follow component-based architecture
- Implement responsive design

### Component Guidelines
- Use functional components
- Implement proper prop types
- Follow accessibility guidelines
- Use CSS modules or Tailwind

## API Integration

### Backend Communication
- Custom hooks for API calls
- Error handling
- Loading states
- Response caching

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5004
```

## Performance Optimization

- Image optimization
- Code splitting
- Lazy loading
- Caching strategies
- Bundle size optimization

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Production Build
```bash
npm run build
```

### Static Export
```bash
npm run export
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- WCAG 2.1 compliance
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Color contrast

