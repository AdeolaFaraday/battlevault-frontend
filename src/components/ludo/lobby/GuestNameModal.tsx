"use client";

import React, { useState } from 'react';
import Modal from '../../common/Modal';
import { User, ChevronRight } from 'lucide-react';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setGuestUser } from '@/src/lib/redux/authSlice';

interface GuestNameModalProps {
    isOpen: boolean;
    gameId: string;
}

const GuestNameModal: React.FC<GuestNameModalProps> = ({ isOpen, gameId }) => {
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            // Generate or retrieve guest user ID
            let guestId = localStorage.getItem('ludo_guest_user_id');
            if (!guestId) {
                guestId = crypto.randomUUID();
                localStorage.setItem('ludo_guest_user_id', guestId);
            }
            dispatch(setGuestUser({ name: name.trim(), gameId, userId: guestId }));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => { }} title="Enter Your Name">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Display Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. LudoMaster"
                            className="w-full bg-[#131620] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            autoFocus
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Join Game
                    <ChevronRight size={20} />
                </button>

                <p className="text-xs text-center text-slate-500">
                    You&apos;re joining as a guest.
                    <span className="block mt-1">
                        Sign in later to save your stats!
                    </span>
                </p>
            </form>
        </Modal>
    );
};

export default GuestNameModal;
