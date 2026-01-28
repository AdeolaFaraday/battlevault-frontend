"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, History } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../components/ludo/hub/Header';
import BottomNav from '../components/common/bottom-nav';
import MatchHistoryStats from '../components/profile/match-history/MatchHistoryStats';
import MatchHistoryCard from '../components/profile/match-history/MatchHistoryCard';
import MatchHistoryFilter from '../components/profile/match-history/MatchHistoryFilter';
import { useUserGames } from '../hooks/profile/useUserGames';

const MatchHistoryScreen = () => {
	const router = useRouter();

	const {
		games,
		totalGames,
		loading,
		error,
		hasMore,
		isFetchingMore,
		searchQuery,
		debouncedSearch,
		setSearchQuery,
		fetchNextPage,
	} = useUserGames();

	return (
		<div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
			<Header />
			<BottomNav />

			<main className="max-w-xl mx-auto px-4 py-8 space-y-8">
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
							<History size={20} className="text-indigo-400" />
						</div>
						<div>
							<h1 className="text-3xl font-black text-white uppercase tracking-tighter">Match History</h1>
							<p className="text-white/80 text-xs font-bold uppercase tracking-widest">Your battle legacy</p>
						</div>
					</div>
				</div>

				{/* Statistics Summary */}
				<MatchHistoryStats />

				{/* Search & Filter */}
				<MatchHistoryFilter
					value={searchQuery}
					onChange={setSearchQuery}
				/>

				{/* Match List */}
				<div className="space-y-4">
					<div className="flex items-center justify-between px-2">
						<span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
							Recent Battles
						</span>
						<span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
							{totalGames} Matches
						</span>
					</div>

					{/* Error State */}
					{error && !loading && games.length === 0 && (
						<div className="text-center py-10 text-slate-500 text-sm">
							Failed to load match history.
						</div>
					)}

					{/* Empty State */}
					{!loading && !error && games.length === 0 && (
						<div className="text-center py-10 text-slate-500 text-sm">
							{debouncedSearch
								? `No matches found for "${debouncedSearch}".`
								: 'You have not played any games yet.'}
						</div>
					)}

					{games.length > 0 && (
						<InfiniteScroll
							dataLength={games.length}
							next={fetchNextPage}
							hasMore={hasMore}
							loader={
								<div className="flex justify-center py-4">
									<div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
								</div>
							}
							endMessage={
								<div className="text-center py-4">
									<span className="text-slate-600 text-sm">No more matches</span>
								</div>
							}
							scrollThreshold={0.9}
						>
							<div className="space-y-3">
								{games.map((game, index) => {
									const created = new Date(game.createdAt);
									const date = created.toLocaleDateString(undefined, {
										month: 'short',
										day: '2-digit',
										year: 'numeric',
									});
									const time = created.toLocaleTimeString(undefined, {
										hour: '2-digit',
										minute: '2-digit',
									});

									return (
										<MatchHistoryCard
											key={game._id}
											game={game.name}
											status={game.status}
											date={date}
											time={time}
											delay={0.1 + index * 0.03}
										/>
									);
								})}
							</div>
						</InfiniteScroll>
					)}
				</div>
			</main>
		</div>
	);
};

export default MatchHistoryScreen;

