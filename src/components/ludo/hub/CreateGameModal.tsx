"use client";

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_FREE_GAME_MUTATION } from '../../../graphql/game/mutations';
import Modal from '../../common/Modal';
import { Copy, Check, Gamepad2, Loader2, Link as LinkIcon } from 'lucide-react';

interface CreateGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose }) => {
    const [gameName, setGameName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const [createGame, { loading, error }] = useMutation(CREATE_FREE_GAME_MUTATION, {
        onCompleted: (data) => {
            console.log({ data });
            const gameId = data.createFreeGame?.data?._id;
            // Generate link based on current origin
            const origin = window.location.origin;
            setGeneratedLink(`${origin}/ludo-lobby/${gameId}`);
        }
    });

    const handleCreateGame = async () => {
        if (!gameName.trim()) return;

        try {
            await createGame({
                variables: {
                    name: gameName,
                    type: 'Ludo' // Default type
                }
            });
        } catch (err) {
            console.error('Error creating game:', err);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClose = () => {
        setGameName('');
        setGeneratedLink('');
        setIsCopied(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Create Free Game">
            {!generatedLink ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Game Name</label>
                        <div className="relative">
                            <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                placeholder="e.g. Friday Night Ludo"
                                className="w-full bg-[#131620] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                            Failed to create game. Please try again.
                        </div>
                    )}

                    <button
                        onClick={handleCreateGame}
                        disabled={loading || !gameName.trim()}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-5 h-5" />
                                Generate Game Link
                            </>
                        )}
                    </button>

                    <p className="text-xs text-center text-slate-500">
                        Create a game link to share with friends and play instantly.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center space-y-3 py-4">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-2">
                            <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white text-center">Game Created!</h3>
                        <p className="text-slate-400 text-sm text-center">
                            Your game <span className="text-indigo-400 font-medium">&quot;{gameName}&quot;</span> is ready. Share the link below to invite players.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Game Link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-[#131620] border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm truncate font-mono">
                                {generatedLink}
                            </div>
                            <button
                                onClick={handleCopyLink}
                                className={`px-4 rounded-xl flex items-center justify-center transition-all border ${isCopied
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    }`}
                            >
                                {isCopied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CreateGameModal;
