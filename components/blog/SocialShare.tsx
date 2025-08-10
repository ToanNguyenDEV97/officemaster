
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaCheck } from 'react-icons/fa';

interface SocialShareProps {
    post: BlogPost;
}

const SocialShare: React.FC<SocialShareProps> = ({ post }) => {
    const [pageUrl, setPageUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client-side
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);
        }
    }, []);
    
    const handleCopy = () => {
        if (!pageUrl) return;
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(post.title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(post.content.substring(0, 100) + '...')}`,
    };

    const ShareButton = ({ href, icon, label, className }: { href: string, icon: React.ReactNode, label: string, className: string }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-white transition-colors duration-200 ${className}`}
        >
            {icon}
        </a>
    );

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-center text-sm">Chia sẻ bài viết</h3>
            <div className="flex items-center justify-center gap-2">
                <ShareButton href={shareLinks.facebook} icon={<FaFacebook className="w-5 h-5"/>} label="Share on Facebook" className="bg-[#1877F2] hover:bg-[#166fe5]" />
                <ShareButton href={shareLinks.twitter} icon={<FaTwitter className="w-5 h-5"/>} label="Share on Twitter" className="bg-[#1DA1F2] hover:bg-[#1a91da]" />
                <ShareButton href={shareLinks.linkedin} icon={<FaLinkedin className="w-5 h-5"/>} label="Share on LinkedIn" className="bg-[#0A66C2] hover:bg-[#095ab0]" />
                <button
                    onClick={handleCopy}
                    aria-label="Copy link"
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-white transition-colors duration-200 ${copied ? 'bg-green-500' : 'bg-slate-500 hover:bg-slate-600'}`}
                >
                   {copied ? <FaCheck className="w-5 h-5" /> : <FaLink className="w-5 h-5"/>}
                </button>
            </div>
        </div>
    );
};

export default SocialShare;
