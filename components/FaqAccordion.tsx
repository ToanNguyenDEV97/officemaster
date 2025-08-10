
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FaqAccordionProps {
    question: string;
    answer: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
            >
                <h3 className="font-semibold text-base text-slate-800">{question}</h3>
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
                    <p className="pt-3 text-slate-600 text-sm leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FaqAccordion;
