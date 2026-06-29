import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercepteur de requête : Injection automatique
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intercepteur de réponse : Gestion centralisée des "erreurs bizarres"
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ici, tu peux traiter les erreurs 401 ou les formats étranges du backend
    if (error.response?.status === 401) {
      // Logique de déconnexion forcée
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;