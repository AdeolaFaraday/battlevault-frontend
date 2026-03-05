"use client";

import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-12 px-4 mt-auto">
            <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.3em]">
                            Made with
                        </span>
                        <Heart
                            size={14}
                            className="text-pink-500 fill-pink-500/20 group-hover:scale-125 group-hover:fill-pink-500 transition-all duration-300"
                        />
                        <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.3em]">
                            By BattleVault Team
                        </span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest opacity-50">
                        &copy; {new Date().getFullYear()} BattleVault. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
