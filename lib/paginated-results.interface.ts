export interface PaginatedResults<T> {
  results: T[];
  count: number;
  start: number;
  limit: number;
}
