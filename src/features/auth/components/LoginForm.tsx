// src/features/auth/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IconWrapper from '../../../components/IconWrapper';
import { UserIcon } from '@heroicons/react/24/outline';
import { Lock, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { ActionSuccessCard } from './common/ActionSuccessCard';
import { AuthLayout } from '../components/AuthLayout';

interface LoginPageProps {
  onLogin: (data: any) => Promise<void> | void;
  onForgotPassword?: (email: string) => Promise<void> | void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onForgotPassword }) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Synchroniser l'URL du navigateur avec l'état du formulaire
  useEffect(() => {
    const currentPath = isForgotPassword ? '/forgot-password' : '/login';
    window.history.pushState({}, '', currentPath);
  }, [isForgotPassword]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setApiError(null);

      if (isForgotPassword) {
        if (onForgotPassword) {
          await onForgotPassword(data.email);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        setResetSent(true);
      } else {
        await onLogin(data);
      }
    } catch (err: any) {
      setApiError(err.message || (isForgotPassword ? "Erreur lors de l'envoi de l'email." : "Erreur de connexion. Vérifiez vos identifiants."));
    } finally {
      setIsLoading(false);
    }
  };

  const title = isForgotPassword ? "Récupération de mot de passe" : "Connexion Admin";
  const subtitle = isForgotPassword 
    ? "Entrez l'adresse email associée à votre compte pour recevoir un lien de réinitialisation." 
    : "Entrez vos identifiants pour accéder à votre espace de gestion.";

  return (
    <AuthLayout title={title} subtitle={subtitle} apiError={apiError}>
      {resetSent ? (
        <ActionSuccessCard 
          title="HeLeP logo"
          description={
            <>
              Un lien de réinitialisation vient d'être envoyé à l'adresse : 
              <span className="font-semibold text-white block mt-0.5">{getValues('email')}</span>
            </>
          }
          secondaryDescription="Veuillez vérifier vos spams si vous ne le recevez pas."
          onBack={() => {
            setResetSent(false);
            setIsForgotPassword(false);
          }}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Champ Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Email professionnel
            </label>
            <div className={`flex items-center gap-3 px-3 py-3 bg-white border rounded-xl transition-all duration-200 focus-within:bg-white focus-within:border-[#0ea5e9] focus-within:ring-2 focus-within:ring-[#0ea5e9]/10 shadow-sm ${errors.email ? 'border-red-300' : 'border-slate-200'}`}>
              <IconWrapper color="#0ea5e9">
                <UserIcon className="w-4 h-4" />
              </IconWrapper>
              <input 
                type="email"
                {...register('email', { required: 'Email requis' })} 
                className="w-full bg-transparent border-none outline-none text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                placeholder="admin@entreprise.com" 
              />
            </div>
            {errors.email && <span className="text-rose-500 text-[11px] font-medium pl-1">{errors.email.message as string}</span>}
          </div>

          {/* Champ Mot de passe */}
          {!isForgotPassword && (
            <div className="flex flex-col gap-1 transition-all duration-500 ease-in-out transform opacity-100">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs font-medium text-[#ef4444] hover:underline cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className={`flex items-center gap-3 px-3 py-3 bg-white border rounded-xl transition-all duration-200 focus-within:bg-white focus-within:border-[#0ea5e9] focus-within:ring-2 focus-within:ring-[#0ea5e9]/10 shadow-sm ${errors.password ? 'border-red-300' : 'border-slate-200'}`}>
                <IconWrapper color="#0ea5e9">
                  <Lock className="w-4 h-4" />
                </IconWrapper>
                <input 
                  type="password" 
                  {...register('password', { required: 'Mot de passe requis' })} 
                  className="w-full bg-transparent border-none outline-none text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                  placeholder="••••••••••••"
                />
              </div>
              {errors.password && <span className="text-rose-500 text-[11px] font-medium pl-1">{errors.password.message as string}</span>}
            </div>
          )}

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-[#ef4444] hover:bg-[#dc2626] transition-all duration-300 shadow-lg shadow-red-500/20 disabled:opacity-50 cursor-pointer text-white mt-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="text-xs sm:text-sm">{isForgotPassword ? "Envoi du lien..." : "Connexion en cours..."}</span>
              </>
            ) : (
              <>
                <span className="text-xs sm:text-sm">
                  {isForgotPassword ? "Envoyer le lien de réinitialisation" : "Valider l'accès"}
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

          {/* Lien de retour */}
          {isForgotPassword && (
            <div className="text-center pt-1 transition-opacity duration-500">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Retour à la connexion
              </button>
            </div>
          )}

        </form>
      )}
    </AuthLayout>
  );
};

export default LoginPage;