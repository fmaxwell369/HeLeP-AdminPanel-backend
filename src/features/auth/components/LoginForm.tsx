// src/features/auth/components/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authServices';
import IconWrapper from '../../../components/IconWrapper';
import { UserIcon } from '@heroicons/react/24/outline';
import { Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await authService.login(data);
      window.location.href = '/dashboard';
    } catch (err: any) {
      alert(err.message || "Erreur de connexion");
    }
  };

  // Classe utilitaire pour l'effet multicolore
  const multicolorClass = "text-transparent bg-clip-text bg-[linear-gradient(90deg,var(--color-red)_0%,var(--color-yellow)_33%,var(--color-green)_66%,var(--color-blue)_100%)]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <h2 className={`text-4xl font-extrabold mb-8 ${multicolorClass}`}>
        Connexion
      </h2>

      {/* Champ Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Email</label>
        <div className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg transition-colors focus-within:border-blue-500 ">
          <IconWrapper color="#3b82f6">
            <UserIcon className="w-6 h-6" />
          </IconWrapper>
          <input 
            {...register('email', { required: true })} 
            className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500"
            placeholder="admin@entreprise.com" 
          />
        </div>
        {errors.email && <span className="text-red-400 text-xs">Email requis</span>}
      </div>

      {/* Champ Mot de passe */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Mot de passe</label>
        <div className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg transition-colors focus-within:border-blue-500 bg-slate-900/50">
          <IconWrapper color="#3b82f6">
            <Lock className="w-6 h-6" />
          </IconWrapper>
          <input 
            type="password" 
            {...register('password', { required: true })} 
            className="w-full bg-transparent border-none outline-none text-white"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className={`w-full py-3 border-2 border-transparent font-bold rounded-lg transition-all duration-300 bg-slate-800 hover:border-blue-500 ${multicolorClass}`}
      >
        Valider l'accès
      </button>
    </form>
  );
};

export default LoginForm;