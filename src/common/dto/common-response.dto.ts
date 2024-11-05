export interface CommonResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T; // This is optional for error responses
  error?: string; // Optional for error responses
}
