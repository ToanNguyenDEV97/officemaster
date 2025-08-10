
import React, { useState } from 'react';
import { Heading } from '../../types';
import { FaListUl, FaChevronDown } from 'react-icons/fa';

interface MobileTableOfContentsProps {
    headings: Heading[];
}

const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = ({ headings }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (headings.length === 0) return null;

    const handleLinkClick = () => {
        // Use setTimeout to allow the navigation to happen before collapsing
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    return (
        <div className="lg:hidden my-6 border-y border-slate-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3 px-1 text-left"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                     <FaListUl className="w-5 h-5 text-indigo-600 mr-3" />
                    <h3 className="font-semibold text-base text-slate-800">Mục lục</h3>
                </div>
                <FaChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <nav className="pt-2 pb-4">
                        <ul className="space-y-2">
                            {headings.map(heading => (
                                <li key={heading.id}>
                                    <a
                                        href={`#${heading.id}`}
                                        onClick={handleLinkClick}
                                        className={`block text-sm transition-colors duration-200 text-slate-600 hover:text-indigo-600
                                            ${heading.level === 3 ? 'pl-8' : 'pl-4'}`
                                        }
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MobileTableOfContents;
