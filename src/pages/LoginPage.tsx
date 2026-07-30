// src/features/auth/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import { authService } from '../features/auth/services/authServices';

const LoginPage: React.FC = () => {
  const handleLogin = async (data: any) => {
    await authService.login(data);
    window.location.href = '/dashboard'; // Redirection après connexion réussie
  };

  const handleForgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  return (
    <div className="w-full">
      <LoginForm 
        onLogin={handleLogin} 
        onForgotPassword={handleForgotPassword} 
      />
    </div>
  );
};

export default LoginPage;