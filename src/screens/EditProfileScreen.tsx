"use client";

import React from 'react';
import {
    ArrowLeft,
    Camera,
    User,
    AtSign,
    FileText,
    Save,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/ludo/hub/Header';
import useEditProfile from '../hooks/profile/useEditProfile';

const EditProfileScreen = () => {
    const {
        form,
        loading,
        showSuccess,
        handleChange,
        handleSubmit,
        goBack,
    } = useEditProfile();

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />

            <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
                {/* Navigation Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={goBack}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Edit Profile</h1>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Personalize your vault</p>
                    </div>
                </div>

                {/* Profile Photo Edit Section */}
                <section className="flex flex-col items-center py-6">
                    <div className="relative group cursor-pointer">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        >
                            <div className="w-full h-full rounded-full bg-[#24283b] flex items-center justify-center overflow-hidden border-4 border-[#1a1d2e] relative">
                                <User size={64} className="text-white opacity-40" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={32} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '6px',
                                right: '6px',
                                zIndex: 30
                            }}
                            className="w-10 h-10 rounded-full bg-indigo-600 border-4 border-[#1a1d2e] flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110"
                        >
                            <Camera size={18} className="text-white" />
                        </div>
                    </div>
                    <p className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tap to change avatar</p>
                </section>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Display Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">Display Name</label>
                        <div className="relative group">
                            <div
                                className="absolute flex items-center pointer-events-none z-20"
                                style={{
                                    left: '1.25rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    marginTop: '1px'
                                }}
                            >
                                <User size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={form.displayName}
                                onChange={(e) => handleChange('displayName', e.target.value)}
                                style={{ paddingLeft: '3.5rem' }}
                                className="w-full pr-4 py-4 bg-[#24283b]/60 border border-white/5 rounded-2xl text-white font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
                                placeholder="How should we call you?"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">Username</label>
                        <div className="relative group">
                            <div
                                className="absolute flex items-center pointer-events-none z-20"
                                style={{
                                    left: '1.25rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    marginTop: '1px'
                                }}
                            >
                                <AtSign size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={form.userName}
                                onChange={(e) => handleChange('userName', e.target.value)}
                                style={{ paddingLeft: '3.5rem' }}
                                className="w-full pr-4 py-4 bg-[#24283b]/60 border border-white/5 rounded-2xl text-white font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
                                placeholder="your_unique_handle"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] px-1">Vault Bio</label>
                        <div className="relative group">
                            <div
                                className="absolute pointer-events-none z-20"
                                style={{
                                    left: '1.25rem',
                                    top: '1.25rem'
                                }}
                            >
                                <FileText size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            </div>
                            <textarea
                                rows={3}
                                value={form.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                style={{ paddingLeft: '3.5rem' }}
                                className="w-full pr-4 py-4 bg-[#24283b]/60 border border-white/5 rounded-2xl text-white font-medium placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md resize-none"
                                placeholder="Tell the world your battle story..."
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-8">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)',
                            width: '100%',
                            padding: '1.25rem 1rem',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            border: 'none',
                            cursor: loading ? 'default' : 'pointer'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                />
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <Save size={20} className="text-white" />
                                    <span className="text-white font-black uppercase tracking-wider">Save Changes</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Gloss effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.button>
                </div>
            </main>

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-emerald-500 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 backdrop-blur-md"
                    >
                        <CheckCircle2 size={24} className="text-white" />
                        <span className="text-white font-black uppercase tracking-wider text-sm">Vault Updated</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditProfileScreen;

