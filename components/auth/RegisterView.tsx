import React, { useState, useEffect } from 'react';
import type { User } from '../../types';
import SocialButton from './SocialButton';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

type View = 'login' | 'register' | 'forgotPassword';

interface RegisterViewProps {
  onLoginSuccess: (user: User) => void;
  onSwitchView: (view: View) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onLoginSuccess, onSwitchView }) => {
  const [mockUser, setMockUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch the mock user for registration simulation from the API
    fetch('/api/v1/users')
      .then(res => res.json())
      .then(data => setMockUser(data.mock))
      .catch(err => console.error("Failed to fetch mock user:", err));
  }, []);


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (mockUser) {
        onLoginSuccess(mockUser);
    } else {
        alert("Đang tải dữ liệu người dùng, vui lòng thử lại sau giây lát.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Tham gia Office Master</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-6 text-sm">Chỉ một bước nữa để bắt đầu học những điều tuyệt vời.</p>
      
      <div className="space-y-3">
        <SocialButton provider="Google" icon={<FaGoogle className="text-[#DB4437]" />} />
        <SocialButton provider="Facebook" icon={<FaFacebook className="text-[#4267B2]" />} />
        <SocialButton provider="Github" icon={<FaGithub className="text-[#171515]" />} />
      </div>

      <div className="my-6 flex items-center">
        <hr className="flex-grow border-slate-200 dark:border-slate-600" />
        <span className="mx-4 text-xs font-medium text-slate-400 dark:text-slate-500">HOẶC ĐĂNG KÝ BẰNG EMAIL</span>
        <hr className="flex-grow border-slate-200 dark:border-slate-600" />
      </div>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Họ và tên</label>
          <input type="text" id="name-register" defaultValue={mockUser?.name || ''} required className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input type="email" id="email-register" defaultValue={mockUser?.email || ''} required className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
          <input type="password" id="password-register" defaultValue="password123" required className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            Bằng việc đăng ký, bạn đồng ý với <a href="#" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">Điều khoản dịch vụ</a> và <a href="#" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">Chính sách bảo mật</a> của chúng tôi.
        </div>
        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Đăng ký
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Đã có tài khoản?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchView('login'); }} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Đăng nhập
        </a>
      </p>
    </div>
  );
};

export default RegisterView;