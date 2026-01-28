"use client";

import React from 'react';
import { Search, Filter } from 'lucide-react';

interface MatchHistoryFilterProps {
	value: string;
	onChange: (value: string) => void;
}

const MatchHistoryFilter = ({ value, onChange }: MatchHistoryFilterProps) => {
	return (
		<div className="flex gap-2">
			<div className="relative flex-1 group">
				<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
					<Search size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
				</div>
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search by game..."
					style={{ paddingLeft: '3rem' }}
					className="w-full pr-4 py-3.5 bg-[#24283b]/60 border border-white/5 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-md"
				/>
			</div>
			<button className="p-3.5 bg-[#24283b]/60 border border-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-[#2a2e42] transition-all backdrop-blur-md">
				<Filter size={20} />
			</button>
		</div>
	);
};

export default MatchHistoryFilter;

