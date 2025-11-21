import { useEffect, useState } from "react";

/**
 * Returns a debounced value that only updates after a specified delay.
 * Useful for search inputs to prevent excessive API calls.
 *
 * @template T
 * @param {T} value - The value to be debounced
 * @param {number} [delay=500] - The delay in milliseconds
 * @returns {T} The debounced value
 *
 * @example
 * const [query, setQuery] = useState("")
 * const debouncedQuery = useDebounce(query, 300)
 *
 * useEffect(() => {
 *   // Triggers only when user stops typing for 300ms
 *   searchApi(debouncedQuery)
 * }, [debouncedQuery])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes (resetting the clock)
    // or if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
