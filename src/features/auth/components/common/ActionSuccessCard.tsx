import React from 'react';
import { ArrowLeft, CheckCircleIcon } from 'lucide-react';

interface ActionSuccessCardProps {
  title: string;
  description: React.ReactNode;
  secondaryDescription?: string;
  onBack: () => void;
  backButtonText?: string;
}

export const ActionSuccessCard: React.FC<ActionSuccessCardProps> = ({
  title,
  description,
  secondaryDescription,
  onBack,
  backButtonText = "Retour à la page de connexion"
}) => {
  return (
    <div className="rounded-3xl shadow-2xl overflow-hidden border border-white/10 text-center">
      {/* Partie supérieure (Teinte sombre de l'image) */}
      <div className="bg-[#4a1d35] p-6 pb-4 space-y-3 flex flex-col items-center justify-center relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-black tracking-tight flex">
            <span className="text-[#ef4444]">H</span>
            <span className="text-[#f59e0b]">e</span>
            <span className="text-[#10b981]">L</span>
            <span className="text-[#0ea5e9]">e</span>
            <span className="text-[#ec4899]">P</span>
          </span>
        </div>
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center backdrop-blur-md justify-center shadow-inner">
          <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
      </div>

      {/* Partie inférieure (Teinte rouge vibrante de l'image) */}
      <div className="bg-[#e5384d] p-6 pt-4 space-y-4 flex flex-col items-center justify-center relative">
        <div className="space-y-1.5 text-white">
          <h4 className="text-base font-bold">Action réussie !</h4>
          <div className="text-xs text-rose-100 leading-relaxed px-2">
            {description}
          </div>
          {secondaryDescription && (
            <p className="text-[11px] text-rose-200/80 pt-0.5">{secondaryDescription}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full bg-white hover:bg-slate-100 text-slate-900 justify-center text-xs font-bold py-3 px-4 rounded-full flex items-center gap-2 shadow-xl transition-transform active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-900" /> {backButtonText}
        </button>
      </div>
    </div>
  );
};