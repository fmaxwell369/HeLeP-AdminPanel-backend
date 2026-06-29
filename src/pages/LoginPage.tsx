// src/features/auth/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-5">
      <div className="w-full max-w-[400px] bg-slate-900 p-10 rounded-2xl border border-white/5 shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-slate-50 mb-2">Administration</h1>
        <p className="text-sm text-slate-400 mb-8">Connexion sécurisée à votre espace</p>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;