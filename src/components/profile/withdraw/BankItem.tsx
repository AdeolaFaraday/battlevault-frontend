"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface BankItemProps {
    id: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    isDefault: boolean;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const BankItem = ({
    id,
    accountName,
    accountNumber,
    bankName,
    isDefault,
    isSelected,
    onSelect,
}: BankItemProps) => {
    return (
        <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(id)}
            className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group",
                isSelected
                    ? "bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                    : "bg-[#24283b]/60 border-white/5 hover:border-white/10 hover:bg-[#2a2e42]/80"
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                        isSelected
                            ? "bg-indigo-500 text-white"
                            : "bg-white/5 text-slate-400 group-hover:text-white"
                    )}
                >
                    <Building2 size={20} />
                </div>
                <div className="text-left">
                    <div className="flex items-center gap-2">
                        <p className="text-white font-bold text-sm">{accountName}</p>
                        {isDefault && (
                            <span className="px-1.5 py-0.5 rounded-md bg-yellow-500/20 border border-yellow-500/30">
                                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                        {bankName} • ****{accountNumber.slice(-4)}
                    </p>
                </div>
            </div>

            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <CheckCircle2 size={22} className="text-indigo-500 fill-indigo-500/20" />
                </motion.div>
            )}
        </motion.button>
    );
};

export default BankItem;
