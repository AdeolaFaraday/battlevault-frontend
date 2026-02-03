"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, ArrowUpCircle, Building2, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SavedBank } from "@/src/api/wallet/useGetSavedBanks";
import useWithdrawWinnings from "@/src/api/wallet/useWithdrawWinnings";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { RootState } from "@/src/lib/redux/store";

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (amount: number, bankName: string) => void;
    savedBanks: SavedBank[];
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, onSuccess, savedBanks }) => {
    const [selectedBank, setSelectedBank] = useState<SavedBank | null>(null);
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { withdrawable, currency } = useAppSelector((state: RootState) => state.wallet);
    const { withdrawWinnings, loading, success, message } = useWithdrawWinnings(
        (data) => {
            if (data.withdrawWinnings.success && selectedBank) {
                onSuccess(parseFloat(amount), selectedBank.bankName);
                handleClose();
            }
        }
    );

    // Set default bank on mount
    useEffect(() => {
        if (isOpen && savedBanks.length > 0 && !selectedBank) {
            const defaultBank = savedBanks.find((b) => b.isDefault) || savedBanks[0];
            setSelectedBank(defaultBank);
        }
    }, [isOpen, savedBanks, selectedBank]);

    const handleClose = () => {
        setAmount("");
        setErrorMessage("");
        onClose();
    };

    const handleUseMax = () => {
        setAmount(withdrawable.toString());
    };

    const handleSubmit = async () => {
        setErrorMessage("");
        const amountNum = parseFloat(amount);

        if (!selectedBank) {
            setErrorMessage("Please select a bank account");
            return;
        }

        if (!amount || amountNum <= 0) {
            setErrorMessage("Please enter a valid amount");
            return;
        }

        if (amountNum > withdrawable) {
            setErrorMessage("Amount exceeds available balance");
            return;
        }

        await withdrawWinnings(amountNum, selectedBank._id);
    };

    const formatCurrency = (value: number) => {
        const symbol = currency === "NGN" ? "₦" : currency || "₦";
        return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#1e2235] border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                        <ArrowUpCircle size={20} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Withdraw Funds</h3>
                                        <p className="text-xs text-white/40">Transfer to your bank account</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                {/* Available Balance */}
                                <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                                <Wallet size={18} className="text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Available</p>
                                                <p className="text-xl font-black text-emerald-400">{formatCurrency(withdrawable)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Selection */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">
                                        Select Bank Account
                                    </label>
                                    {savedBanks.length === 0 ? (
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                            <p className="text-white/40 text-sm">No bank accounts linked</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {savedBanks.map((bank) => (
                                                <button
                                                    key={bank._id}
                                                    onClick={() => setSelectedBank(bank)}
                                                    className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-3 ${selectedBank?._id === bank._id
                                                            ? "bg-indigo-500/10 border-indigo-500"
                                                            : "bg-white/5 border-white/10 hover:border-white/20"
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedBank?._id === bank._id
                                                            ? "bg-indigo-500 text-white"
                                                            : "bg-white/10 text-white/60"
                                                        }`}>
                                                        <Building2 size={18} />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="text-white font-bold text-sm">{bank.accountName}</p>
                                                        <p className="text-white/40 text-xs">{bank.bankName} • ****{bank.accountNumber.slice(-4)}</p>
                                                    </div>
                                                    {selectedBank?._id === bank._id && (
                                                        <CheckCircle2 size={20} className="text-indigo-400" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
                                            Amount
                                        </label>
                                        <button
                                            onClick={handleUseMax}
                                            className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors"
                                        >
                                            Use Max
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <span className="text-2xl font-black text-indigo-500">₦</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-2xl font-black text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {(errorMessage || (message && !success)) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2"
                                    >
                                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                                        <p className="text-red-400 text-sm font-medium">{errorMessage || message}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={!selectedBank || !amount || loading}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-500/20 transition-all"
                                >
                                    {loading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            <ArrowUpCircle size={18} />
                                            <span>Withdraw Now</span>
                                        </>
                                    )}
                                </motion.button>

                                <p className="text-center text-[10px] text-white/30 font-medium">
                                    Withdrawals are usually processed within 24 hours
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WithdrawModal;
