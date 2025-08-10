
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface SectionHeaderProps {
    title: string;
    tag?: string;
    viewAllLink?: string;
    onViewAllClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, tag, viewAllLink, onViewAllClick }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
                {tag && (
                    <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-md">{tag}</span>
                )}
            </div>
            {viewAllLink && (
                <a 
                    href={viewAllLink}
                    onClick={(e) => {
                        if (onViewAllClick) {
                            e.preventDefault();
                            onViewAllClick(e);
                        }
                    }}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group inline-flex items-center text-sm">
                    <span>Xem tất cả</span>
                    <FaArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            )}
        </div>
    );
};

export default SectionHeader;