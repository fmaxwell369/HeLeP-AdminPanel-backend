// src/features/auth/services/authService.ts
import apiClient from '../../../api/apiClient';
import type{  LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<any>('/login', credentials);

      // --- BRICOLAGE POUR BACKEND CAPRICIEUX ---
      // Si le backend renvoie des champs non standards ou des niveaux imbriqués
      const rawData = response.data;
      
      const normalizedData: LoginResponse = {
        token: rawData.token || rawData.access_token || rawData.data?.token,
        user: rawData.user || { id: '', email: credentials.email, role: 'admin' }
      };

      if (!normalizedData.token) {
        throw new Error("Le serveur n'a pas renvoyé de jeton d'authentification valide.");
      }

      // Stockage sécurisé
      localStorage.setItem('adminToken', normalizedData.token);
      
      return normalizedData;
    } catch (error: any) {
      // Normalisation de l'erreur pour l'UI
      const message = error.response?.data?.message || "Identifiants invalides ou serveur indisponible";
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    // Optionnel : appeler une route /logout si elle existe
  }
};