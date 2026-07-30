// src/features/auth/pages/ResetPasswordPage.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';
import { authService } from '../features/auth/services/authServices';
import { hasUrlParam } from '../utils/urlChecker';

const ResetPasswordPage: React.FC = () => {
  // Optionnel : Rediriger directement vers le login si le token est absent de l'URL
  if (!hasUrlParam('token')) {
    return <Navigate to="/login" replace />;
  }

  const handleResetPassword = async (token: string, newPassword: string) => {
    await authService.resetPassword(token, newPassword);
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="w-full">
      <ResetPasswordForm 
        onResetPassword={handleResetPassword} 
        onBackToLogin={handleBackToLogin} 
      />
    </div>
  );
};

export default ResetPasswordPage;