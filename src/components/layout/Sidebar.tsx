// src/components/layout/Sidebar.tsx
import React from 'react';
import { 
  LayoutDashboard, Users, FileText, Settings, 
  ChevronDown, History, Plus, Grid, Image, 
  ArrowUpRight, Bell, Search, Key, Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const NavLink = ({ icon: Icon, label, active, arrow }: any) => (
    <a href="#" className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-gray-200 text-slate-900' : 'text-slate-600 hover:bg-gray-100'}`}>
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      {arrow && <ArrowUpRight size={16} />}
    </a>
  );

  return (
    // h-screen fixe la hauteur, overflow-hidden empêche le scroll sur la sidebar elle-même
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 p-4 flex flex-col overflow-hidden">
      
      {/* Partie haute scrollable si besoin */}
      <div className="flex-1 overflow-y-auto scrollbar-helep">
        {/* Header avec Logo */}
        <div className="flex items-center justify-between px-2 mb-8">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 text-helep-shimmer">
            HeLeP <span className="text-slate-400 font-normal">Dashboard</span>
          </h1>
          <ChevronDown size={18} className="text-slate-500" />
        </div>

        {/* Sections de navigation */}
        <div className="space-y-6">
          <div>
            <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Explore</p>
            <NavLink icon={Sparkles} label="Playground" active />
            <NavLink icon={History} label="History" />
          </div>

          <div>
            <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Build</p>
            <NavLink icon={Plus} label="New app" />
            <NavLink icon={Grid} label="My apps" />
            <NavLink icon={Image} label="Gallery" />
          </div>

          <div>
            <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Manage</p>
            <NavLink icon={LayoutDashboard} label="Dashboard" />
            <NavLink icon={FileText} label="Documentation" arrow />
          </div>
        </div>
      </div>

      {/* Partie basse fixe (Upgrade + Profil) - Ne scrollera jamais */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 shrink-0">
        <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-1">Upgrade to unlock more</h4>
          <p className="text-xs text-slate-500">Access higher limits, Pro models, and more.</p>
        </div>

        <div className="flex justify-between px-2">
          {[Bell, Settings, Search, Key].map((Icon, i) => (
            <button key={i} className="p-2 text-slate-600 hover:bg-gray-200 rounded-lg"><Icon size={18} /></button>
          ))}
        </div>

        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xs">C</div>
          <span className="text-sm text-slate-700 truncate">yibooket@gmail.com</span>
        </div>
      </div>
    </aside>
  );
};