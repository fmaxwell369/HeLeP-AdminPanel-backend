// src/features/auth/components/ResetPasswordForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconWrapper from '../../../components/IconWrapper';
import { Lock, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { ActionSuccessCard } from './common/ActionSuccessCard';
import { AuthLayout } from '../components/AuthLayout';
import { hasUrlParam } from '../../../utils/urlChecker';

interface ResetPasswordFormProps {
  onResetPassword: (token: string, newPassword: string) => Promise<void> | void;
  onBackToLogin: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onResetPassword, onBackToLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Vérification de la présence du token via notre utilitaire
  const hasTokenParam = hasUrlParam('token');
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const onSubmit = async (data: any) => {
    if (!token) {
      setApiError("Jeton de réinitialisation manquant ou invalide.");
      return;
    }

    try {
      setIsLoading(true);
      setApiError(null);
      await onResetPassword(token, data.newPassword);
      setIsSuccess(true);
    } catch (err: any) {
      setApiError(err.message || "Une erreur est survenue lors de la réinitialisation du mot de passe.");
    } finally {
      setIsLoading(false);
    }
  };

  const title = "Nouveau mot de passe";
  const subtitle = "Veuillez saisir votre nouveau mot de passe sécurisé.";

  return (
    <AuthLayout title={title} subtitle={subtitle} apiError={apiError}>
      {!hasTokenParam ? (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-3.5 rounded-r-lg text-red-700 text-xs sm:text-sm">
            <p className="font-bold">Lien invalide</p>
            <p>Le jeton (token) de réinitialisation est absent de l'URL.</p>
          </div>
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0ea5e9] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </button>
          </div>
        </div>
      ) : isSuccess ? (
        <ActionSuccessCard 
          title="HeLeP logo"
          description="Votre mot de passe a été modifié avec succès. Vous pouvez dès à présent vous connecter."
          secondaryDescription="Sécurité du compte validée."
          onBack={onBackToLogin}
          backButtonText="Aller à la connexion"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Champ Nouveau Mot de passe */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Nouveau mot de passe
            </label>
            <div className={`flex items-center gap-3 px-3 py-3 bg-white border rounded-xl transition-all duration-200 focus-within:bg-white focus-within:border-[#0ea5e9] focus-within:ring-2 focus-within:ring-[#0ea5e9]/10 shadow-sm ${errors.newPassword ? 'border-red-300' : 'border-slate-200'}`}>
              <IconWrapper color="#0ea5e9">
                <Lock className="w-4 h-4" />
              </IconWrapper>
              <input 
                type="password" 
                {...register('newPassword', { 
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }
                })} 
                className="w-full bg-transparent border-none outline-none text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                placeholder="••••••••••••"
              />
            </div>
            {errors.newPassword && <span className="text-rose-500 text-[11px] font-medium pl-1">{errors.newPassword.message as string}</span>}
          </div>

          {/* Champ Confirmation */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Confirmer le mot de passe
            </label>
            <div className={`flex items-center gap-3 px-3 py-3 bg-white border rounded-xl transition-all duration-200 focus-within:bg-white focus-within:border-[#0ea5e9] focus-within:ring-2 focus-within:ring-[#0ea5e9]/10 shadow-sm ${errors.confirmPassword ? 'border-red-300' : 'border-slate-200'}`}>
              <IconWrapper color="#0ea5e9">
                <Lock className="w-4 h-4" />
              </IconWrapper>
              <input 
                type="password" 
                {...register('confirmPassword', { 
                  required: 'Veuillez confirmer le mot de passe',
                  validate: (value) => value === watch('newPassword') || 'Les mots de passe ne correspondent pas'
                })} 
                className="w-full bg-transparent border-none outline-none text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                placeholder="••••••••••••"
              />
            </div>
            {errors.confirmPassword && <span className="text-rose-500 text-[11px] font-medium pl-1">{errors.confirmPassword.message as string}</span>}
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-[#ef4444] hover:bg-[#dc2626] transition-all duration-300 shadow-lg shadow-red-500/20 disabled:opacity-50 cursor-pointer text-white mt-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span className="text-xs sm:text-sm">Mise à jour...</span>
              </>
            ) : (
              <>
                <span className="text-xs sm:text-sm">Réinitialiser le mot de passe</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

          {/* Lien de retour vers la connexion */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0ea5e9] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </button>
          </div>

        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPasswordForm;