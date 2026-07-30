// src/features/auth/components/AuthLayout.tsx
import React from 'react';
import { TriangleIcon } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  apiError?: string | null;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  apiError,
  children,
}) => {
  return (
    <div className="h-screen w-screen flex bg-white overflow-hidden fixed inset-0">
      
      {/* SECTION GAUCHE : Visuel & Logo HeLeP */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-orange-50 flex-col justify-between p-8 xl:p-12 border-r border-slate-100 overflow-hidden">
        
        {/* Logo HeLeP aux couleurs exactes */}
        <div className="flex items-center gap-2">
          <span className="text-2xl xl:text-3xl font-black tracking-tight flex">
            <span className="text-[#ef4444]">H</span>
            <span className="text-[#f59e0b]">e</span>
            <span className="text-[#10b981]">L</span>
            <span className="text-[#0ea5e9]">e</span>
            <span className="text-[#ec4899]">P</span>
          </span>
        </div>

        {/* Illustration / Image de fond avec texte d'accompagnement */}
        <div className="relative z-10 my-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 aspect-[16/10] max-w-md mx-auto w-full">
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop" 
            alt="Illustration HeLeP" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-6 xl:p-8">
            <div className="text-white space-y-0.5">
              <h3 className="text-lg xl:text-xl font-bold">Espace de Gestion Sécurisé</h3>
              <p className="text-xs text-slate-300">Pilotez votre plateforme avec efficacité et simplicité.</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} HeLeP. Tous droits réservés.
        </div>
      </div>

      {/* SECTION DROITE : Contenu dynamique du formulaire */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-red-50 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-auto">
          
          {/* En-tête mobile */}
          <div className="lg:hidden flex items-center justify-center mb-2">
            <span className="text-2xl font-black tracking-tight flex">
              <span className="text-[#ef4444]">H</span>
              <span className="text-[#f59e0b]">e</span>
              <span className="text-[#10b981]">L</span>
              <span className="text-[#0ea5e9]">e</span>
              <span className="text-[#ec4899]">P</span>
            </span>
          </div>

          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {subtitle}
            </p>
          </div>

          {/* Zone d'affichage des erreurs API stylisée */}
          {apiError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3.5 rounded-r-lg flex items-start gap-3 text-red-700 shadow-sm">
              <TriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm font-medium">
                <p className="font-bold">Erreur</p>
                <p>{apiError}</p>
              </div>
            </div>
          )}

          {children}

        </div>
      </div>

    </div>
  );
};