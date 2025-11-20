const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 404) {
      const error = new Error('Not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    try {
      const errorData = await response.json();
      const error = new Error(errorData.error.message);
      error.code = errorData.error.code;
      error.details = errorData.error.details;
      throw error;
    } catch (e) {
      throw new Error('An unexpected error occurred');
    }
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const entriesAPI = {
  getAll: () => apiRequest('/entries'),

  getById: (id) => apiRequest(`/entries/${id}`),

  create: (entry) =>
    apiRequest('/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
    }),

  update: (id, entry) =>
    apiRequest(`/entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
    }),

  delete: (id) =>
    apiRequest(`/entries/${id}`, {
      method: 'DELETE',
    }),
};
