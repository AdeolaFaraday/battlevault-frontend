"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Building2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import useListBanks, { PaystackBank } from "@/src/api/wallet/useListBanks";
import useVerifyBankAccount from "@/src/api/wallet/useVerifyBankAccount";
import useCreateTransferRecipient from "@/src/api/wallet/useCreateTransferRecipient";

interface LinkBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const LinkBankModal: React.FC<LinkBankModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBank, setSelectedBank] = useState<PaystackBank | null>(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [showBankDropdown, setShowBankDropdown] = useState(false);

    const { listBanks, banks, loading: banksLoading } = useListBanks();
    const { verifyBankAccount, verification, loading: verifying, success: verifySuccess } = useVerifyBankAccount();
    const { createTransferRecipient, loading: creating, success: createSuccess, message: createMessage } = useCreateTransferRecipient(
        () => {
            onSuccess();
            handleClose();
        }
    );

    // Fetch banks when modal opens
    useEffect(() => {
        if (isOpen && banks.length === 0) {
            listBanks();
        }
    }, [isOpen, banks.length, listBanks]);

    // Auto-verify when account number is 10 digits and bank is selected
    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            verifyBankAccount(accountNumber, selectedBank.code);
        }
    }, [accountNumber, selectedBank, verifyBankAccount]);

    const filteredBanks = useMemo(() => {
        if (!searchQuery) return banks;
        return banks.filter((bank) =>
            bank.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [banks, searchQuery]);

    const handleClose = () => {
        setSearchQuery("");
        setSelectedBank(null);
        setAccountNumber("");
        setShowBankDropdown(false);
        onClose();
    };

    const handleSelectBank = (bank: PaystackBank) => {
        setSelectedBank(bank);
        setShowBankDropdown(false);
        setSearchQuery("");
    };

    const handleSubmit = async () => {
        if (!selectedBank || !accountNumber || !verifySuccess) return;
        await createTransferRecipient(accountNumber, selectedBank.code);
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
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                                        <Building2 size={20} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Link Bank Account</h3>
                                        <p className="text-xs text-white/40">Add your bank for withdrawals</p>
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
                                {/* Bank Selection */}
                                <div className="space-y-2 relative">
                                    <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">
                                        Select Bank
                                    </label>
                                    <button
                                        onClick={() => setShowBankDropdown(!showBankDropdown)}
                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-left flex items-center justify-between hover:bg-white/8 transition-colors"
                                    >
                                        <span className={selectedBank ? "text-white font-medium" : "text-white/40"}>
                                            {selectedBank ? selectedBank.name : "Choose your bank"}
                                        </span>
                                        <Building2 size={18} className="text-slate-500" />
                                    </button>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {showBankDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-20 top-full left-0 right-0 mt-2 bg-[#252940] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                            >
                                                {/* Search */}
                                                <div className="p-3 border-b border-white/5">
                                                    <div className="relative">
                                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            placeholder="Search banks..."
                                                            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>

                                                {/* Bank List */}
                                                <div className="max-h-60 overflow-y-auto">
                                                    {banksLoading ? (
                                                        <div className="flex items-center justify-center py-8">
                                                            <Loader2 size={24} className="text-indigo-400 animate-spin" />
                                                        </div>
                                                    ) : filteredBanks.length === 0 ? (
                                                        <div className="py-8 text-center text-white/40 text-sm">
                                                            No banks found
                                                        </div>
                                                    ) : (
                                                        filteredBanks.map((bank) => (
                                                            <button
                                                                key={bank.code}
                                                                onClick={() => handleSelectBank(bank)}
                                                                className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                                                    <Building2 size={14} className="text-white/60" />
                                                                </div>
                                                                <span className="text-white text-sm font-medium">{bank.name}</span>
                                                            </button>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Account Number Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">
                                        Account Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            placeholder="Enter 10-digit account number"
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                        />
                                        {verifying && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Loader2 size={18} className="text-indigo-400 animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Verification Result */}
                                <AnimatePresence>
                                    {verification && verifySuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 size={20} className="text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Account Name</p>
                                                    <p className="text-white font-bold">{verification.accountName}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Error Message */}
                                {createMessage && !createSuccess && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                                        <AlertCircle size={20} className="text-red-400" />
                                        <p className="text-red-400 text-sm font-medium">{createMessage}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={!selectedBank || !verifySuccess || creating}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-black uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-500/20 transition-all"
                                >
                                    {creating ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            <Building2 size={18} />
                                            <span>Link Bank Account</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LinkBankModal;
