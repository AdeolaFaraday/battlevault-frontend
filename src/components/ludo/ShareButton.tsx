"use client";

import React from 'react';
import { Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

interface ShareButtonProps {
    gameId: string;
    className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ gameId, className }) => {
    const [copied, setCopied] = React.useState(false);

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/ludo-lobby/${gameId}` : '';

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Watch my Ludo match on BattleVault!',
                    text: 'Come and watch me play this Ludo match!',
                    url: shareUrl,
                });
                toast.success('Shared successfully!');
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error sharing:', error);
                    copyToClipboard();
                }
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy link');
        }
    };

    return (
        <motion.button
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className={cn(
                "group relative flex items-center justify-center rounded-2xl overflow-hidden z-50",
                "h-auto w-auto",
                "px-3 py-2 sm:px-5 sm:py-2.5",
                "bg-gradient-to-r from-indigo-600/90 to-violet-600/90 backdrop-blur-md",
                "border border-white/20 shadow-lg shadow-indigo-500/20",
                "text-white font-semibold transition-all duration-300",
                "hover:shadow-indigo-500/40 hover:border-white/40",
                className
            )}
            title="Invite others to watch"
        >
            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-2xl bg-indigo-400 opacity-10 group-hover:animate-pulse transition-opacity pointer-events-none" />

            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        // initial={{ translateY: 10, opacity: 0 }}
                        // animate={{ translateY: 0, opacity: 1 }}
                        // exit={{ translateY: -10, opacity: 0 }}
                        className="flex items-center gap-1.5"
                    >
                        <Check size={18} className="text-emerald-300" />
                        <span className="text-xs font-bold tracking-wide">Copied!</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="share"
                        // initial={{ translateY: 10, opacity: 0 }}
                        // animate={{ translateY: 0, opacity: 1 }}
                        // exit={{ translateY: -10, opacity: 0 }}
                        className="flex items-center gap-1.5"
                    >
                        <Share2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="inline sm:hidden text-xs font-bold tracking-wide">Live stream</span>
                        <span className="hidden sm:inline text-xs font-bold tracking-wide">Invite others to watch</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shine effect */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />
        </motion.button>
    );
};

export default ShareButton;
