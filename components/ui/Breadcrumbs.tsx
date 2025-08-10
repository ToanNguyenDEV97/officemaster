
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
    label: string;
    action: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | null;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className="flex items-center flex-wrap text-sm text-slate-500">
                {items.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <FaChevronRight className="inline mx-2 w-2.5 h-2.5" />}
                        {crumb.action ? (
                            <a href="#" onClick={crumb.action} className="hover:text-indigo-600 transition-colors">
                                {crumb.label}
                            </a>
                        ) : (
                            <span className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-none">{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
