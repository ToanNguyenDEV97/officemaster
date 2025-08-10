
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const NewsletterCTA: React.FC = () => {
    return (
        <div className="bg-slate-100 rounded-lg p-6 md:p-8 my-8 border border-slate-200 text-center">
            <div className="flex justify-center items-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4">
                <FaEnvelope className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Đừng bỏ lỡ mẹo hay</h3>
            <p className="text-slate-600 mt-2 mb-6 max-w-md mx-auto">
                Đăng ký nhận bản tin hàng tuần của Office Master để cập nhật những bài viết mới nhất, mẹo hữu ích và các ưu đãi độc quyền.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    required
                    className="flex-grow w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
                    Đăng ký
                </button>
            </form>
        </div>
    );
};

export default NewsletterCTA;
