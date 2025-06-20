import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import prefetchCommonData from './lib/prefetch'

// Start prefetching common data in the background
prefetchCommonData().catch(error => {
  console.warn('Failed to prefetch common data:', error);
});

createRoot(document.getElementById("root")!).render(<App />);
