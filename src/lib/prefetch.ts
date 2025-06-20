import { prefetch } from './api';

/**
 * Prefetch common data needed across the application
 * This can be called when the app initializes
 */
export async function prefetchCommonData(): Promise<void> {
  // Prefetch global content for main pages
  const prefetchPromises = [
    prefetch('/globals/homepage'),
    prefetch('/globals/about'),
    prefetch('/globals/products'),
    prefetch('/globals/contact'),
    prefetch('/globals/reparateur'),
    prefetch('/globals/bertiny'),
  ];

  // Wait for all prefetch operations to complete
  await Promise.allSettled(prefetchPromises);
  console.log('Prefetched common data');
}

/**
 * Prefetch product data
 */
export async function prefetchProducts(): Promise<void> {
  await prefetch('/smartphones');
  console.log('Prefetched products data');
}

/**
 * Prefetch application data
 */
export async function prefetchApplications(): Promise<void> {
  await prefetch('/applications');
  console.log('Prefetched applications data');
}

export default prefetchCommonData; 