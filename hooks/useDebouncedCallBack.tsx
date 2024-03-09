import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useDebouncedCallback<T>(
  value: T,
  delay: number,
  callback: (debouncedValue: T) => void | Promise<void>
): T {
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    callback(debouncedValue);
  }, [debouncedValue]);

  return debouncedValue;
}
