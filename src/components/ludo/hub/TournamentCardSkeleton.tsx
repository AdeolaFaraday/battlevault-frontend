import React from 'react';
import Skeleton from '../../common/Skeleton';

export const TournamentFeaturedSkeleton = () => {
    return (
        <div className="w-full bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/10 rounded-2xl p-5 md:p-6 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-20 h-4 rounded bg-amber-500/20" />
                        <Skeleton className="w-24 h-3 rounded" />
                    </div>
                    <div>
                        <Skeleton className="w-3/4 h-8 mb-2" />
                        <Skeleton className="w-1/2 h-4" />
                    </div>
                    <Skeleton className="w-40 h-8 rounded-lg" />
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                    <Skeleton className="w-full h-14 rounded-lg" />
                    <Skeleton className="w-full h-12 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export const TournamentItemSkeleton = () => {
    return (
        <div className="bg-[#24283b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="w-32 h-5" />
                    <div className="flex gap-3">
                        <Skeleton className="w-20 h-3" />
                        <Skeleton className="w-20 h-3" />
                    </div>
                </div>
            </div>
            <Skeleton className="w-16 h-9 rounded-lg" />
        </div>
    );
};
