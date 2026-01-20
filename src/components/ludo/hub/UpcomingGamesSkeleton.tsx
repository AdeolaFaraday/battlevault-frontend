import React from 'react';
import Skeleton from '../../common/Skeleton';

const UpcomingGamesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
                <div key={i} className="bg-[#24283b] border border-white/5 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                            <Skeleton className="w-1/2 h-5" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-16 h-5 rounded" />
                                <Skeleton className="w-12 h-3" />
                            </div>
                        </div>
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Skeleton className="w-24 h-3" />
                        <Skeleton className="w-32 h-3" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpcomingGamesSkeleton;
