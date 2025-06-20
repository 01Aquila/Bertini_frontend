import { useState, useEffect, useCallback } from 'react';
import { fetchGlobal, clearCache, CacheOptions } from '../lib/api';

/**
 * Custom hook to fetch and use global data from Payload CMS with caching
 * 
 * @param slug - The global slug to fetch
 * @param cacheOptions - Optional cache configuration
 * @returns Object with data, loading state, error state, and refetch function
 */
export function useGlobal<T = any>(slug: string, cacheOptions?: CacheOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch or refetch data
  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      
      // If forceRefresh is true, clear the cache for this endpoint first
      if (forceRefresh) {
        clearCache(`/globals/${slug}`);
      }
      
      // Use the cache options provided or default
      const result = await fetchGlobal(slug, cacheOptions);
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [slug, cacheOptions]);

  // Initial data fetch
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (mounted) {
          console.error(`Error loading global ${slug}:`, err);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [slug, fetchData]);

  // Return data, loading state, error, and refetch function
  return { 
    data, 
    loading, 
    error, 
    refetch: (forceRefresh = true) => fetchData(forceRefresh) 
  };
}

/**
 * Hook to fetch homepage global data
 */
export function useHomepage(cacheOptions?: CacheOptions) {
  return useGlobal('homepage', cacheOptions);
}

/**
 * Hook to fetch about page global data
 */
export function useAboutPage(cacheOptions?: CacheOptions) {
  return useGlobal('about', cacheOptions);
}

/**
 * Hook to fetch products page global data
 */
export function useProductsPage(cacheOptions?: CacheOptions) {
  return useGlobal('products', cacheOptions);
}

/**
 * Hook to fetch contact page global data
 */
export function useContactPage(cacheOptions?: CacheOptions) {
  return useGlobal('contact', cacheOptions);
}

/**
 * Hook to fetch réparateur page global data
 */
export function useReparateurPage(cacheOptions?: CacheOptions) {
  return useGlobal('reparateur', cacheOptions);
}

/**
 * Hook to fetch bertiny page global data
 */
export function useBertinyPage(cacheOptions?: CacheOptions) {
  return useGlobal('bertiny', cacheOptions);
} 