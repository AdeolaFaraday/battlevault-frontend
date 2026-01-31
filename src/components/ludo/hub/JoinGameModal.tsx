"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../common/Modal';
import { Copy, Check, Link as LinkIcon, ArrowRight } from 'lucide-react';

interface JoinGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const JoinGameModal: React.FC<JoinGameModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [gameLink, setGameLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState('');

    const handlePasteLink = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setGameLink(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };

    const extractGameId = (link: string): string | null => {
        // Try to extract game ID from various link formats
        // e.g., http://localhost:3000/ludo-lobby/abc123 or just abc123
        const patterns = [
            /\/ludo-lobby\/([a-zA-Z0-9]+)/,
            /\/game\/([a-zA-Z0-9]+)/,
            /^([a-zA-Z0-9]{20,})$/ // Direct ID (MongoDB ObjectId is 24 chars)
        ];

        for (const pattern of patterns) {
            const match = link.trim().match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const handleContinueToGame = () => {
        const gameId = extractGameId(gameLink);

        if (!gameId) {
            setError('Invalid game link. Please paste a valid game link.');
            return;
        }

        setError('');
        handleClose();
        router.push(`/ludo-lobby/${gameId}`);
    };

    const handleClose = () => {
        setGameLink('');
        setIsCopied(false);
        setError('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Join Game">
            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-2">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-1">
                        <LinkIcon className="w-7 h-7" />
                    </div>
                    <p className="text-slate-400 text-sm text-center">
                        Paste the game link shared by your friend to join their game.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Game Link</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={gameLink}
                            onChange={(e) => {
                                setGameLink(e.target.value);
                                setError('');
                            }}
                            placeholder="Paste game link here..."
                            className="flex-1 bg-[#131620] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button
                            onClick={handlePasteLink}
                            className={`px-4 rounded-xl flex items-center justify-center transition-all border ${isCopied
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                }`}
                        >
                            {isCopied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleContinueToGame}
                    disabled={!gameLink.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <span>Continue to Game</span>
                    <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-center text-slate-500">
                    Make sure you have the correct game link from your friend.
                </p>
            </div>
        </Modal>
    );
};

export default JoinGameModal;
