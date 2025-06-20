import { useState, useEffect, useCallback } from 'react';
import { fetchFromAPI, CacheOptions, clearCache } from '../lib/api';

// Define pagination response interface
export interface PaginationResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface UseCollectionOptions {
  initialPage?: number;
  limit?: number;
  cacheOptions?: CacheOptions;
}

/**
 * Custom hook to fetch collection data with pagination and caching
 * 
 * @param endpoint - API endpoint for the collection
 * @param options - Collection fetch options
 * @returns Collection data, pagination state, loading state, error, and utility functions
 */
export function useCollection<T = any>(
  endpoint: string,
  options: UseCollectionOptions = {}
) {
  const { initialPage = 1, limit = 10, cacheOptions } = options;
  
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  // Function to fetch data with pagination
  const fetchData = useCallback(async (pageNum: number = page, forceRefresh = false) => {
    try {
      setLoading(true);
      
      // Build the endpoint with pagination parameters
      const paginatedEndpoint = `${endpoint}?page=${pageNum}&limit=${limit}`;
      
      // If forceRefresh is true, clear the cache for this endpoint
      if (forceRefresh) {
        clearCache(paginatedEndpoint);
      }
      
      // Fetch data with caching
      const response = await fetchFromAPI(paginatedEndpoint, cacheOptions);
      
      if (response?.docs && Array.isArray(response.docs)) {
        setData(response.docs);
        setPagination(response);
        setPage(pageNum);
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error(`Error fetching collection ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, limit, page, cacheOptions]);

  // Initial data fetch
  useEffect(() => {
    fetchData(initialPage);
  }, [initialPage, fetchData]);

  // Functions for pagination navigation
  const goToPage = useCallback((pageNum: number) => {
    if (pageNum > 0 && (!pagination || pageNum <= pagination.totalPages)) {
      fetchData(pageNum);
    }
  }, [fetchData, pagination]);

  const nextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      goToPage(page + 1);
    }
  }, [pagination, page, goToPage]);

  const prevPage = useCallback(() => {
    if (pagination?.hasPrevPage) {
      goToPage(page - 1);
    }
  }, [pagination, page, goToPage]);

  const refresh = useCallback((forceRefresh = true) => {
    return fetchData(page, forceRefresh);
  }, [fetchData, page]);

  return {
    data,
    pagination,
    loading,
    error,
    page,
    goToPage,
    nextPage,
    prevPage,
    refresh
  };
}

/**
 * Hook to fetch smartphones with pagination
 */
export function useSmartphones(options: UseCollectionOptions = {}) {
  return useCollection('/smartphones', {
    limit: 6,
    ...options,
    cacheOptions: {
      maxAge: 5 * 60 * 1000, // 5 minutes
      revalidate: true,
      ...options.cacheOptions
    }
  });
}

/**
 * Hook to fetch applications with pagination
 */
export function useApplications(options: UseCollectionOptions = {}) {
  return useCollection('/applications', {
    limit: 8,
    ...options,
    cacheOptions: {
      maxAge: 5 * 60 * 1000, // 5 minutes
      revalidate: true,
      ...options.cacheOptions
    }
  });
} 