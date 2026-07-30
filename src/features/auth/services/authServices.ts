// src/features/auth/services/authService.ts
import apiClient from '../../../api/apiClient';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<any>('/login', credentials);

      // --- BRICOLAGE POUR BACKEND CAPRICIEUX ---
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
      const message = error.response?.data?.message || "Identifiants invalides ou serveur indisponible";
      throw new Error(message);
    }
  },

  // Demande de réinitialisation du mot de passe (envoi du mail)
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>('/request-password-reset', { email });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Erreur lors de l'envoi de la demande de réinitialisation";
      throw new Error(message);
    }
  },

  // Nouvelle fonction pour valider et enregistrer le nouveau mot de passe via le token
  resetPassword: async (resetToken: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>('/reset-password', {
        resetToken,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Jeton invalide ou expiré, veuillez refaire une demande.";
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  }
};