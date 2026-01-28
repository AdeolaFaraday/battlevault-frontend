"use client";

import React from 'react';

const LeaderboardCardSkeleton = () => {
    return (
        <div className="flex items-center justify-between p-4 mb-3 rounded-2xl bg-[#24283b]/60 backdrop-blur-md border border-white/5 animate-pulse">
            <div className="flex items-center gap-4">
                {/* Rank Number */}
                <div className="w-8 h-5 bg-slate-700 rounded" />

                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full bg-slate-700" />

                {/* User Info */}
                <div className="flex flex-col gap-2">
                    <div className="w-28 h-4 bg-slate-700 rounded" />
                    <div className="w-20 h-3 bg-slate-800 rounded" />
                </div>
            </div>

            {/* Points Section */}
            <div className="flex flex-col items-end gap-1">
                <div className="w-16 h-5 bg-slate-700 rounded" />
                <div className="w-10 h-3 bg-slate-800 rounded" />
            </div>
        </div>
    );
};

interface LeaderboardSkeletonProps {
    count?: number;
}

const LeaderboardSkeleton = ({ count = 5 }: LeaderboardSkeletonProps) => {
    return (
        <div className="space-y-1">
            {Array.from({ length: count }).map((_, index) => (
                <LeaderboardCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default LeaderboardSkeleton;
