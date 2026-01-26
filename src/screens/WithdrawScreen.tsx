"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet } from 'lucide-react';
import Header from '../components/ludo/hub/Header';
import BottomNav from '../components/common/bottom-nav';
import BalanceCard from '../components/profile/withdraw/BalanceCard';
import CardItem from '../components/profile/withdraw/CardItem';
import AddCardSection from '../components/profile/withdraw/AddCardSection';
import WithdrawForm from '../components/profile/withdraw/WithdrawForm';

const WithdrawScreen = () => {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = useState('card-1');

    const savedCards = [
        { id: 'card-1', bank: 'Access Bank', lastFour: '4242', type: 'VISA' },
        { id: 'card-2', bank: 'Zenith Bank', lastFour: '8812', type: 'MASTERCARD' },
    ];

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />
            <BottomNav />

            <main className="max-w-xl mx-auto px-4 py-8 space-y-10">
                {/* Navigation Header */}
                <div className="flex items-center gap-4">
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
                        <div className="mb-2">
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Withdraw</h1>
                            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Liquidate your treasures</p>
                        </div>
                    </div>
                </div>

                {/* Hero Balance Section */}
                <BalanceCard />

                {/* Main Withdrawal Form */}
                <WithdrawForm />

                {/* Payment Methods Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Receiving Accounts</h3>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-0.5 rounded-full">Secure</span>
                    </div>

                    <div className="space-y-3">
                        {savedCards.map((card) => (
                            <CardItem
                                key={card.id}
                                {...card}
                                isSelected={selectedCard === card.id}
                                onSelect={setSelectedCard}
                            />
                        ))}
                    </div>

                    <AddCardSection />
                </div>

                <div className="text-center pt-4">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Encrypted by BattleVault Security</p>
                </div>
            </main>
        </div>
    );
};

export default WithdrawScreen;
