"use client";

import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStats } from '@/src/hooks/profile/useUserStats';

const MatchHistoryStats = () => {
	const { stats, loading } = useUserStats();

	const totalPlayed = stats?.totalGamesPlayed ?? 0;
	const totalWins = stats?.totalWins ?? 0;
	const winRate = stats ? `${stats.winPercentage.toFixed(0)}%` : '0%';

	const items = [
		{ label: 'Total Played', value: loading ? '—' : totalPlayed.toString(), icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
		{ label: 'Total Wins', value: loading ? '—' : totalWins.toString(), icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
		{ label: 'Win Rate', value: loading ? '—' : winRate, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
	];

	return (
		<div className="grid grid-cols-3 gap-3 md:gap-4">
			{items.map((stat, index) => (
				<motion.div
					key={stat.label}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="bg-[#24283b]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-md"
				>
					<div className={`${stat.bg} p-2 rounded-xl mb-3`}>
						<stat.icon size={20} className={stat.color} />
					</div>
					<span className="text-white font-black text-lg md:text-xl italic">{stat.value}</span>
					<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
						{stat.label}
					</span>
				</motion.div>
			))}
		</div>
	);
};

export default MatchHistoryStats;

