
import React from 'react';

interface InfoCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`bg-white border border-slate-200 rounded-lg p-6 ${className}`}>
            <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                {icon}
                <span className="ml-3">{title}</span>
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default InfoCard;
