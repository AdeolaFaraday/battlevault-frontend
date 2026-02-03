"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet, Plus, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppLayout } from '../components/common/layout';
import BalanceCard from '../components/profile/withdraw/BalanceCard';
import BankItem from '../components/profile/withdraw/BankItem';
import LinkBankModal from '../components/profile/withdraw/LinkBankModal';
import WithdrawModal from '../components/profile/withdraw/WithdrawModal';
import WithdrawSuccessModal from '../components/profile/withdraw/WithdrawSuccessModal';
import useGetWallet from '../api/wallet/useGetWallet';
import useGetSavedBanks from '../api/wallet/useGetSavedBanks';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';

const WithdrawScreen = () => {
    const router = useRouter();
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [isLinkBankModalOpen, setIsLinkBankModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successData, setSuccessData] = useState({ amount: 0, bankName: '' });

    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
    const { withdrawable, currency } = useAppSelector((state: RootState) => state.wallet);

    const { getWallet } = useGetWallet();
    const { getSavedBanks, savedBanks, refetch, loading: banksLoading } = useGetSavedBanks();

    // Fetch wallet and banks on mount
    useEffect(() => {
        if (currentUser) {
            getWallet();
            getSavedBanks();
        }
    }, [currentUser, getWallet, getSavedBanks]);

    // Set default selected bank
    useEffect(() => {
        if (savedBanks.length > 0 && !selectedBank) {
            const defaultBank = savedBanks.find((b) => b.isDefault) || savedBanks[0];
            setSelectedBank(defaultBank._id);
        }
    }, [savedBanks, selectedBank]);

    const handleLinkBankSuccess = () => {
        // Refetch saved banks after linking new one
        if (refetch) refetch();
    };

    const handleWithdrawSuccess = (amount: number, bankName: string) => {
        setSuccessData({ amount, bankName });
        setIsSuccessModalOpen(true);
        // Refresh wallet balance
        getWallet();
    };

    const handleSuccessClose = () => {
        setIsSuccessModalOpen(false);
    };

    return (
        <AppLayout>
            {/* Navigation Header */}
            <section className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Wallet size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Withdraw</h1>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Liquidate your treasures</p>
                    </div>
                </div>
            </section>

            {/* Balance Card */}
            <BalanceCard />

            {/* Withdraw Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsWithdrawModalOpen(true)}
                disabled={withdrawable <= 0 || savedBanks.length === 0}
                style={{
                    background: 'linear-gradient(to right, #10b981, #14b8a6)',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                }}
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden transition-all"
            >
                <ArrowUpCircle size={22} className="text-white group-hover:-translate-y-1 transition-transform" />
                <span className="text-white font-black uppercase tracking-wider text-base">Initiate Withdrawal</span>
                {/* Gloss effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>

            {/* Bank Accounts Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Linked Banks</h3>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-0.5 rounded-full">Secure</span>
                </div>

                <div className="space-y-3">
                    {banksLoading ? (
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : savedBanks.length === 0 ? (
                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center">
                            <p className="text-white/40 text-sm mb-1">No bank accounts linked yet</p>
                            <p className="text-white/20 text-xs">Add a bank to start withdrawing</p>
                        </div>
                    ) : (
                        savedBanks.map((bank) => (
                            <BankItem
                                key={bank._id}
                                id={bank._id}
                                accountName={bank.accountName}
                                accountNumber={bank.accountNumber}
                                bankName={bank.bankName}
                                isDefault={bank.isDefault}
                                isSelected={selectedBank === bank._id}
                                onSelect={setSelectedBank}
                            />
                        ))
                    )}
                </div>

                {/* Link Bank Button */}
                <button
                    onClick={() => setIsLinkBankModalOpen(true)}
                    className="w-full h-16 rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-3 group"
                >
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                        <Plus size={18} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="text-slate-400 group-hover:text-white font-bold transition-colors text-sm">Link Bank Account</span>
                </button>
            </section>

            {/* Footer */}
            <div className="text-center">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Encrypted by BattleVault Security</p>
            </div>

            {/* Modals */}
            <LinkBankModal
                isOpen={isLinkBankModalOpen}
                onClose={() => setIsLinkBankModalOpen(false)}
                onSuccess={handleLinkBankSuccess}
            />

            <WithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                onSuccess={handleWithdrawSuccess}
                savedBanks={savedBanks}
            />

            <WithdrawSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessClose}
                amount={successData.amount}
                bankName={successData.bankName}
                currency={currency}
            />
        </AppLayout>
    );
};

export default WithdrawScreen;
