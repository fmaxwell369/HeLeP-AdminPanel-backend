import React from 'react';
import { Menu, Wand2, ArrowLeftRight, Plus, MoreVertical, ShieldAlert } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 mb-8">
      {/* Côté gauche : Menu + État */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={20} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
          <ShieldAlert size={16} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Mode Administration</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mx-1" />
          <span className="text-sm text-slate-500">HeLeP Core active</span>
        </div>
      </div>

      {/* Côté droit : Actions */}
      <div className="flex items-center gap-2 text-slate-600">
        <button className="p-2 hover:bg-gray-100 rounded-full"><Wand2 size={20} /></button>
        <button className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeftRight size={20} /></button>
        <button className="p-2 hover:bg-gray-100 rounded-full"><Plus size={20} /></button>
        <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={20} /></button>
      </div>
    </div>
  );
};