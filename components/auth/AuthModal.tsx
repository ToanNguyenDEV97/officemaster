
import React, { useState, useEffect, useCallback } from 'react';
import type { User } from '../../types';
import { FaTimes } from 'react-icons/fa';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import ForgotPasswordView from './ForgotPasswordView';
import { OfficeMasterLogo } from '../ui/OfficeMasterLogo';

type View = 'login' | 'register' | 'forgotPassword';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialView?: View;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialView = 'login' }) => {
  const [view, setView] = useState<View>(initialView);

  useEffect(() => {
    if (isOpen) {
        setView(initialView);
    }
  }, [isOpen, initialView]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md m-auto relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
          aria-label="Đóng"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="p-8">
            <div className="flex justify-center mb-6">
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center space-x-2">
                    <OfficeMasterLogo />
                    <span className="font-semibold text-xl text-slate-800 dark:text-slate-100">Office Master</span>
                </a>
            </div>
          {view === 'login' && <LoginView onLoginSuccess={onLoginSuccess} onSwitchView={setView} />}
          {view === 'register' && <RegisterView onLoginSuccess={onLoginSuccess} onSwitchView={setView} />}
          {view === 'forgotPassword' && <ForgotPasswordView onSwitchView={setView} />}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;