import React, { useState, useEffect } from 'react';
import { Search, X, MessageSquarePlus } from 'lucide-react';
import { useSearchUsers } from '@/src/api/chat/useSearchUsers';
import { AnimatePresence, motion } from 'framer-motion';

interface SearchUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectUser: (userId: string) => void;
}

const SearchUserModal = ({ isOpen, onClose, onSelectUser }: SearchUserModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchUsers, loading, users } = useSearchUsers();

    // Debounce search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.trim().length >= 2) {
                searchUsers(searchTerm);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Cleanup on close
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f111a]/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-md bg-[#24283b] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh]"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#1a1d2e]">
                        <div className="flex items-center gap-2">
                            <MessageSquarePlus className="text-indigo-400 w-5 h-5" />
                            <h2 className="text-lg font-black text-white tracking-tight">New Message</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="p-4 shrink-0 bg-[#1e2235]">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or username..."
                                className="w-full bg-[#1a1d2e] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                            />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 px-1">
                            Type at least 2 characters to search
                        </p>
                    </div>

                    {/* Results List */}
                    <div className="flex-1 overflow-y-auto p-2 scrollbar-hide bg-[#24283b]">
                        {loading && searchTerm.length >= 2 ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Searching Vault...</span>
                            </div>
                        ) : users.length > 0 && searchTerm.length >= 2 ? (
                            <div className="space-y-1">
                                {users.map(user => (
                                    <button
                                        key={user._id}
                                        onClick={() => onSelectUser(user._id)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#1e2235] transition-colors border border-transparent hover:border-white/5 group text-left"
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1a1d2e] bg-slate-800 shrink-0">
                                            <img
                                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}`}
                                                alt={user.userName}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://ui-avatars.com/api/?name=' + user.firstName;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold text-sm truncate group-hover:text-indigo-300 transition-colors">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-slate-400 text-xs font-medium truncate">
                                                @{user.userName}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : searchTerm.length >= 2 ? (
                            <div className="text-center py-10">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                    <Search className="w-6 h-6 text-slate-500" />
                                </div>
                                <p className="text-slate-300 font-bold text-sm">No battlers found</p>
                                <p className="text-slate-500 text-xs mt-1">Try searching a different username</p>
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchUserModal;
