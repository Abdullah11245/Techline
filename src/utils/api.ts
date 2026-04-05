export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export async function authenticatedFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('adminToken');
  const headers = new Headers(options.headers || undefined);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(buildUrl(path), {
    ...options,
    headers,
  });
}
