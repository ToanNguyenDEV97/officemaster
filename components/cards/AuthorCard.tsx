
import React from 'react';
import { Instructor } from '../../types';

interface AuthorCardProps {
    author: Instructor | undefined;
    heading?: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, heading = "Về tác giả" }) => {
    if (!author) return null;
    
    return (
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <img src={author.avatarUrl} alt={author.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">{heading}</p>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{author.name}</h3>
                    <p className="text-sm text-indigo-600 font-semibold">{author.title}</p>
                    <p className="text-sm text-slate-600 mt-2">{author.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default AuthorCard;
