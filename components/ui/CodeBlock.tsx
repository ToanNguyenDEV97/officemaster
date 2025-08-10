
import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism/';

const CodeBlock: React.FC<any> = ({ node, inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return !inline && match ? (
        <div className="relative my-4 rounded-lg shadow-lg bg-[#f8f9fa] group border border-slate-200">
             <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 rounded-t-lg border-b border-slate-200">
                <span className="text-xs font-sans text-slate-500 uppercase">{match[1]}</span>
                 <button onClick={handleCopy} className="text-slate-500 hover:text-slate-800 transition-colors" aria-label="Copy code">
                    {copied ? (
                        <span className="flex items-center text-xs text-green-600 font-semibold">
                            <FaCheck className="mr-1.5"/> Đã sao chép!
                        </span>
                    ) : (
                         <span className="flex items-center text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                            <FaCopy className="mr-1.5"/> Sao chép
                        </span>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    overflowX: 'auto'
                }}
                codeTagProps={{
                    style: { fontFamily: '"Fira Code", "Courier New", monospace'}
                }}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className="bg-slate-100 text-indigo-700 rounded-md px-1.5 py-0.5 font-semibold before:content-[''] after:content-['']" {...props}>
            {children}
        </code>
    );
};

export default CodeBlock;
