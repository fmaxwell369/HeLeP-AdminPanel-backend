// src/pages/DashboardPage.tsx
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  Wallet, 
  Settings,
  LayoutDashboard,
  Users,
  AlertCircle
} from 'lucide-react';

// Composant pour les cartes type "Service"
const ServiceCard = ({ icon: Icon, title, description, actionText, subAction }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-slate-700">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        {description}
      </p>
    </div>
    
    <div className="flex items-center justify-between mt-auto">
      {subAction ? (
         <span className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center gap-1">
           {subAction} <ExternalLink size={12} />
         </span>
      ) : <div />}
      
      <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all ml-auto">
        {actionText} <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 text-helep-shimmer">
          Services disponibles
        </h2>
        <p className="text-slate-500 mt-2">Gérez et surveillez vos services opérationnels en un clin d'œil.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Secure Authentication */}
        <ServiceCard 
          icon={ShieldCheck} 
          title="Secure Auth" 
          description="Gérez les accès, les sessions et la sécurité des comptes utilisateurs en temps réel."
          actionText="Configure"
          subAction="Documentation"
        />
        
        {/* Manage Dispute */}
        <ServiceCard 
          icon={Scale} 
          title="Manage Dispute" 
          description="Accédez aux litiges en cours, examinez les preuves et résolvez les conflits rapidement."
          actionText="Review"
        />

        {/* Escrow Details */}
        <ServiceCard 
          icon={Wallet} 
          title="Escrow Details" 
          description="Surveillez les transactions sous séquestre et le statut des fonds bloqués."
          actionText="View Funds"
          subAction="Audit"
        />

        {/* Admin Interface */}
        <ServiceCard 
          icon={Settings} 
          title="Admin Interface" 
          description="Paramètres globaux, configuration des permissions et outils de maintenance système."
          actionText="Settings"
        />

        {/* Autres services */}
        <ServiceCard 
          icon={LayoutDashboard} 
          title="Analytics" 
          description="Visualisez les rapports d'activité et les métriques de performance de HeLeP."
          actionText="Open"
        />
        
        <ServiceCard 
          icon={Users} 
          title="User Management" 
          description="Gérez les comptes admins et les permissions d'accès au niveau granulaire."
          actionText="Manage"
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;