import React from 'react';
import Skeleton from '../../common/Skeleton';
import { Zap, Flame } from 'lucide-react';

const DailyBlitzSkeleton = () => {
    return (
        <section className="w-full space-y-4">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gray-700 fill-gray-700 animate-pulse" />
                    <Skeleton className="w-32 h-6" />
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    <Flame size={14} className="text-gray-700 fill-gray-700 animate-pulse" />
                    <Skeleton className="w-20 h-3" />
                </div>
            </div>

            {/* Main Card Skeleton */}
            <div className="relative w-full bg-[#1a1d2e] border border-white/5 rounded-3xl p-6 overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Streak & Progress Skeleton */}
                    <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
                        <div className="space-y-2">
                            <Skeleton className="w-24 h-3" />
                            <div className="flex items-baseline gap-2">
                                <Skeleton className="w-16 h-10" />
                                <Skeleton className="w-20 h-3" />
                            </div>
                            <Skeleton className="w-full h-2.5 rounded-full" />
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <Skeleton className="w-20 h-3 mb-2" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-5 h-5 rounded-full" />
                                <Skeleton className="w-24 h-5" />
                            </div>
                        </div>

                        <Skeleton className="w-full h-12 rounded-2xl" />
                    </div>

                    {/* Right Column: Missions List Skeleton */}
                    <div className="lg:col-span-2 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="w-1/3 h-4" />
                                    </div>
                                    <Skeleton className="w-3/4 h-3" />
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="flex-1 h-1 rounded-full" />
                                        <Skeleton className="w-8 h-3" />
                                    </div>
                                </div>
                                <Skeleton className="w-16 h-6 rounded-full shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DailyBlitzSkeleton;
