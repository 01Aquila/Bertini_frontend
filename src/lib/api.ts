// API utility functions for fetching data from Payload CMS with caching and revalidation

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bertini-backend.vercel.app';

// Cache storage
interface CacheItem {
  data: any;
  timestamp: number;
}

export interface CacheOptions {
  maxAge?: number; // Cache duration in milliseconds
  revalidate?: boolean; // Whether to revalidate stale data
}

// In-memory cache
const cache: Record<string, CacheItem> = {};

// Default cache options
const DEFAULT_CACHE_OPTIONS: CacheOptions = {
  maxAge: 5 * 60 * 1000, // 5 minutes default
  revalidate: true
};

/**
 * Fetch data from the Payload API with caching
 * @param endpoint - API endpoint to fetch from
 * @param cacheOptions - Cache configuration options
 * @returns Promise with the data
 */
export async function fetchFromAPI(endpoint: string, cacheOptions: CacheOptions = DEFAULT_CACHE_OPTIONS) {
  const cacheKey = `${API_URL}/api${endpoint}`;
  const now = Date.now();
  const cachedItem = cache[cacheKey];
  
  // Check if we have a valid cached response
  if (cachedItem && now - cachedItem.timestamp < (cacheOptions.maxAge || DEFAULT_CACHE_OPTIONS.maxAge!)) {
    console.log(`Cache hit for ${endpoint}`);
    return cachedItem.data;
  }
  
  // If we have stale data and revalidate is true, return stale data but refresh in background
  if (cachedItem && cacheOptions.revalidate) {
    console.log(`Returning stale data for ${endpoint} while revalidating`);
    
    // Revalidate in background
    fetchAndCache(cacheKey, endpoint).catch(console.error);
    
    // Return stale data immediately
    return cachedItem.data;
  }
  
  // No cache or expired cache without revalidation option
  return fetchAndCache(cacheKey, endpoint);
}

/**
 * Fetch and cache data
 * @param cacheKey - Key to store in cache
 * @param endpoint - API endpoint
 * @returns Promise with the data
 */
async function fetchAndCache(cacheKey: string, endpoint: string): Promise<any> {
  try {
    console.log(`Fetching fresh data for ${endpoint}`);
    const response = await fetch(`${API_URL}/api${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store in cache
    cache[cacheKey] = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}

/**
 * Clear the entire cache or a specific endpoint
 * @param endpoint - Optional endpoint to clear from cache
 */
export function clearCache(endpoint?: string) {
  if (endpoint) {
    const cacheKey = `${API_URL}/api${endpoint}`;
    delete cache[cacheKey];
    console.log(`Cleared cache for ${endpoint}`);
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
    console.log('Cleared entire cache');
  }
}

/**
 * Prefetch and cache data for an endpoint
 * @param endpoint - API endpoint to prefetch
 */
export async function prefetch(endpoint: string): Promise<void> {
  try {
    await fetchFromAPI(endpoint);
    console.log(`Prefetched ${endpoint}`);
  } catch (error) {
    console.error(`Failed to prefetch ${endpoint}:`, error);
  }
}

/**
 * Fetch a global from Payload CMS
 * @param slug - The global slug
 * @param cacheOptions - Cache configuration options
 * @returns Promise with the global data
 */
export async function fetchGlobal(slug: string, cacheOptions?: CacheOptions) {
  return fetchFromAPI(`/globals/${slug}`, {
    ...DEFAULT_CACHE_OPTIONS,
    maxAge: 10 * 60 * 1000, // 10 minutes for globals
    ...cacheOptions
  });
}

/**
 * Fetch homepage global data
 * @returns Homepage data
 */
export async function fetchHomepage(cacheOptions?: CacheOptions) {
  return fetchGlobal('homepage', cacheOptions);
}

/**
 * Fetch about page global data
 * @returns About page data
 */
export async function fetchAboutPage(cacheOptions?: CacheOptions) {
  return fetchGlobal('about', cacheOptions);
}

/**
 * Fetch products page global data
 * @returns Products page data
 */
export async function fetchProductsPage(cacheOptions?: CacheOptions) {
  return fetchGlobal('products', cacheOptions);
}

/**
 * Fetch contact page global data
 * @returns Contact page data
 */
export async function fetchContactPage(cacheOptions?: CacheOptions) {
  return fetchGlobal('contact', cacheOptions);
}

/**
 * Fetch réparateur page global data
 * @returns Réparateur page data
 */
export async function fetchReparateurPage(cacheOptions?: CacheOptions) {
  return fetchGlobal('reparateur', cacheOptions);
}

/**
 * Fetch bertiny page global data
 * @returns Bertiny page data
 */
export async function fetchBertinyPage(cacheOptions?: CacheOptions) {
  return fetchGlobal('bertiny', cacheOptions);
}

/**
 * Fetch all products data
 * @param cacheOptions - Cache configuration options
 * @returns Array of products
 */
export async function fetchProducts(cacheOptions?: CacheOptions) {
  return fetchFromAPI('/smartphones', {
    ...DEFAULT_CACHE_OPTIONS,
    maxAge: 5 * 60 * 1000, // 5 minutes for products
    ...cacheOptions
  });
}

/**
 * Fetch a single product by ID
 * @param id - Product ID
 * @param cacheOptions - Cache configuration options
 * @returns Product data
 */
export async function fetchProductById(id: string, cacheOptions?: CacheOptions) {
  return fetchFromAPI(`/smartphones/${id}`, {
    ...DEFAULT_CACHE_OPTIONS,
    maxAge: 5 * 60 * 1000, // 5 minutes for product details
    ...cacheOptions
  });
} 