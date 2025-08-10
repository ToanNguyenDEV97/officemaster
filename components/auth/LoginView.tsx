import React, { useState, useEffect } from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import type { User } from '../../types';
import SocialButton from './SocialButton';

type View = 'login' | 'register' | 'forgotPassword';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onSwitchView: (view: View) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onSwitchView }) => {
  const [mockUser, setMockUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the mock user for login simulation from the API
    fetch('/api/v1/users')
      .then(res => res.json())
      .then(data => setMockUser(data.mock)) // API returns { all: [...], mock: {...} }
      .catch(err => console.error("Failed to fetch mock user:", err));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mockUser) {
      onLoginSuccess(mockUser);
    } else {
      alert("Đang tải dữ liệu người dùng, vui lòng thử lại sau giây lát.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Đăng nhập vào Office Master</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-6 text-sm">Tiếp tục hành trình chinh phục kỹ năng của bạn.</p>
      
      <div className="space-y-3">
        <SocialButton provider="Google" icon={<FaGoogle className="text-[#DB4437]" />} />
        <SocialButton provider="Facebook" icon={<FaFacebook className="text-[#4267B2]" />} />
        <SocialButton provider="Github" icon={<FaGithub className="text-[#171515]" />} />
      </div>

      <div className="my-6 flex items-center">
        <hr className="flex-grow border-slate-200 dark:border-slate-600" />
        <span className="mx-4 text-xs font-medium text-slate-400 dark:text-slate-500">HOẶC ĐĂNG NHẬP BẰNG EMAIL</span>
        <hr className="flex-grow border-slate-200 dark:border-slate-600" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email-login" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input type="email" id="email-login" defaultValue={mockUser?.email || ''} required className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password-login" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Mật khẩu</label>
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchView('forgotPassword'); }} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Quên mật khẩu?</a>
          </div>
          <input type="password" id="password-login" defaultValue="password123" required className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Đăng nhập
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Chưa có tài khoản?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchView('register'); }} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
};

export default LoginView;