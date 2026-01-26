"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type AlertType = 'success' | 'error' | 'warning';

interface CustomAlertProps {
    type: AlertType;
    title: string;
    message?: string;
    onClose?: () => void;
}

const CustomAlert = ({ type, title, message, onClose }: CustomAlertProps) => {
    const config = {
        success: {
            icon: CheckCircle2,
            bg: "bg-[#0f172a]/80",
            border: "border-emerald-500/50",
            iconColor: "text-emerald-400",
            glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
            accent: "bg-emerald-500/10"
        },
        error: {
            icon: AlertCircle,
            bg: "bg-[#0f172a]/80",
            border: "border-rose-500/50",
            iconColor: "text-rose-400",
            glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
            accent: "bg-rose-500/10"
        },
        warning: {
            icon: AlertTriangle,
            bg: "bg-[#0f172a]/80",
            border: "border-amber-500/50",
            iconColor: "text-amber-400",
            glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
            accent: "bg-amber-500/10"
        }
    };

    const { icon: Icon, bg, border, iconColor, glow, accent } = config[type];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={cn(
                "min-w-[320px] max-w-[400px] p-4 rounded-2xl border backdrop-blur-xl flex gap-4 relative overflow-hidden",
                bg,
                border,
                glow
            )}
        >
            {/* Visual Accent */}
            <div className={cn("absolute inset-0 z-0", accent)} />

            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 z-10", accent)}>
                <Icon size={24} className={iconColor} />
            </div>

            <div className="flex-1 pt-1 z-10">
                <h4 className="font-black text-white uppercase tracking-wider text-sm">{title}</h4>
                {message && <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">{message}</p>}
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all z-10"
                >
                    <X size={14} />
                </button>
            )}

            {/* Subtle glow line at bottom */}
            <div className={cn("absolute bottom-0 left-0 h-[2px] w-full z-10", iconColor.replace('text', 'bg'))} />
        </motion.div>
    );
};

export default CustomAlert;
