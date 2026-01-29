"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingDown, Clock, Wallet } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAppSelector } from '../../../lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';

interface MatchHistoryCardProps {
	game: string;
	status: string;
	date: string;
	time: string;
	stake?: string;
	earnings?: string;
	playerCount?: number;
	delay?: number;
	winner?: string;
}

const MatchHistoryCard = ({
	game,
	// status,
	date,
	time,
	stake,
	earnings,
	playerCount,
	delay = 0,
	winner
}: MatchHistoryCardProps) => {
	const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
	const isWin = winner === currentUser?._id;

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay }}
			whileHover={{ x: 5 }}
			className="group bg-[#24283b]/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-all hover:bg-[#2a2e42]/80 hover:border-white/10 backdrop-blur-md"
		>
			<div className="flex items-center gap-4">
				{/* Result Icon */}
				<div className={cn(
					"w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:rotate-12",
					isWin
						? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
						: "bg-red-500/10 border-red-500/20 text-red-400"
				)}>
					{isWin ? <Trophy size={24} /> : <TrendingDown size={24} />}
				</div>

				{/* Match Info */}
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<span className="text-white font-bold">{game}</span>
						{typeof playerCount === 'number' && (
							<span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-full">
								{playerCount} Players
							</span>
						)}
					</div>
					<div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
						<div className="flex items-center gap-1">
							<Clock size={12} />
							{date} • {time}
						</div>
					</div>
				</div>
			</div>

			{/* Financial Info */}
			<div className="text-right space-y-1">
				{earnings && (
					<div className={cn(
						"font-black italic flex items-center justify-end gap-1.5",
						isWin ? "text-emerald-400" : "text-slate-400"
					)}>
						{isWin ? '+' : '-'}{earnings}
					</div>
				)}
				{stake && (
					<div className="flex items-center justify-end gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
						<Wallet size={10} />
						Stake: {stake}
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default MatchHistoryCard;

