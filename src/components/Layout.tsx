import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, LayoutDashboard, LogOut, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SyncManager from './SyncManager';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 text-center pb-24">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl max-w-md w-full">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-white mb-2">Ops! Algo deu errado.</h2>
        <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
          {error.message || 'Houve um erro na renderização do componente.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-[#ee4d2d] hover:bg-[#ff5733] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw size={18} />
          Continuar
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <SyncManager />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#000000]/80 backdrop-blur-xl border-t border-zinc-900 pb-safe pt-2 px-6 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center pb-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-[#ee4d2d]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Calculator size={24} />
            <span className="text-[10px] font-medium">Calculadora</span>
          </NavLink>
          
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-[#ee4d2d]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-medium">Dashboard</span>
          </NavLink>

          <button 
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <LogOut size={24} />
            <span className="text-[10px] font-medium">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
