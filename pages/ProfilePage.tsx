
import React, { useState, useMemo } from 'react';
import type { User } from '../types';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import { FaUserEdit, FaCamera, FaSave, FaTimes, FaShieldAlt, FaBell } from 'react-icons/fa';

interface ProfilePageProps {
    user: User;
    onUpdateUser: (user: User) => void;
    onNavigate: (pageId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser, onNavigate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatarUrl);

    const formattedJoinDate = useMemo(() => {
        if (!user.joinDate) return 'Không rõ';
        return new Date(user.joinDate).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }, [user.joinDate]);

    const handleEditToggle = () => {
        if (isEditing) {
            // If canceling, revert changes
            setName(user.name);
            setAvatar(user.avatarUrl);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        onUpdateUser({ ...user, name, avatarUrl: avatar });
        setIsEditing(false);
    };
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if(event.target && typeof event.target.result === 'string'){
                    setAvatar(event.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProfileSidebar activePage="profile" onNavigate={onNavigate} />
            
            <div className="lg:col-span-3 space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Thông tin cá nhân</h1>
                        {!isEditing ? (
                             <button onClick={handleEditToggle} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100">
                                <FaUserEdit />
                                <span>Chỉnh sửa</span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                                    <FaSave />
                                    <span>Lưu</span>
                                </button>
                                <button onClick={handleEditToggle} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                                    <FaTimes />
                                    <span>Hủy</span>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="relative group flex-shrink-0">
                             <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-slate-200" />
                            {isEditing && (
                                <>
                                    <label htmlFor="avatar-upload" className="cursor-pointer absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaCamera className="w-8 h-8"/>
                                    </label>
                                    <input type="file" id="avatar-upload" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                                </>
                            )}
                        </div>
                        <div className="w-full">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-500 mb-1">Họ và tên</label>
                                     {isEditing ? (
                                        <input type="text" id="fullName" value={name} onChange={(e) => setName(e.target.value)} className="block w-full max-w-sm px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    ) : (
                                        <p className="text-lg font-semibold text-slate-800">{name}</p>
                                    )}
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                                    <p className="text-lg text-slate-800">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Vai trò</label>
                                    <span className="text-sm font-semibold capitalize bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{user.role}</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">Ngày tham gia</label>
                                    <p className="text-slate-800">{formattedJoinDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3"><FaShieldAlt className="text-slate-500"/>Bảo mật</h2>
                    <div className="space-y-4 max-w-sm">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Đổi mật khẩu</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3"><FaBell className="text-slate-500"/>Thông báo</h2>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-700">Thông báo khóa học mới</p>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                         <div className="flex items-center justify-between">
                            <p className="text-slate-700">Bản tin hàng tuần</p>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
