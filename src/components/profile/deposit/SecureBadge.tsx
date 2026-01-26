"use client";

import React from 'react';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

const SecureBadge = () => {
    return (
        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <ShieldCheck size={24} className="text-indigo-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">PCI-DSS</span>
                </div>
                <div className="w-[1px] h-8 bg-indigo-500/10" />
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <Lock size={24} className="text-indigo-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">256-bit SSL</span>
                </div>
                <div className="w-[1px] h-8 bg-indigo-500/10" />
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <CreditCard size={24} className="text-indigo-400" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Verified</span>
                </div>
            </div>
            <p className="text-[10px] font-bold text-indigo-300/40 uppercase tracking-widest text-center">
                Your payment data is fully encrypted and never stored on our servers.
            </p>
        </div>
    );
};

export default SecureBadge;
