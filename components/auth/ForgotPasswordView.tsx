
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

type View = 'login' | 'register' | 'forgotPassword';

interface ForgotPasswordViewProps {
  onSwitchView: (view: View) => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onSwitchView }) => {

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Nếu email của bạn tồn tại trong hệ thống, bạn sẽ nhận được một liên kết khôi phục mật khẩu.');
    onSwitchView('login');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Quên mật khẩu?</h2>
      <p className="text-center text-slate-500 mb-6">Đừng lo, chúng tôi sẽ giúp bạn. Vui lòng nhập email của bạn.</p>
      
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label htmlFor="email-forgot" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" id="email-forgot" required className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Gửi liên kết khôi phục
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onSwitchView('login'); }} 
          className="font-medium text-sm text-indigo-600 hover:text-indigo-500 inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Quay lại Đăng nhập
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
