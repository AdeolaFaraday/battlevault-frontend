import React from 'react';
import Skeleton from '../../common/Skeleton';
import { motion } from 'framer-motion';

const ActiveGameCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-700/20 to-indigo-900/20" />

            <div className="relative p-5 md:p-8 flex flex-col md:flex-row items-center gap-6">
                {/* Left: Board Preview Skeleton */}
                <div className="relative shrink-0">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-xl" />
                </div>

                {/* Middle: Info Skeleton */}
                <div className="flex-1 text-center md:text-left space-y-3 w-full">
                    <div className="space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Skeleton className="w-24 h-5 rounded" />
                            <Skeleton className="w-16 h-4 rounded" />
                        </div>
                        <Skeleton className="w-3/4 h-8 mx-auto md:mx-0" />
                        <Skeleton className="w-1/2 h-5 mx-auto md:mx-0" />
                    </div>

                    {/* Avatars skeleton */}
                    <div className="flex items-center justify-center md:justify-start -space-x-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                </div>

                {/* Right: Button Skeleton */}
                <div className="w-full md:w-auto mt-2 md:mt-0">
                    <Skeleton className="w-full md:w-40 h-14 rounded-xl" />
                </div>
            </div>
        </motion.div>
    );
};

export default ActiveGameCardSkeleton;
