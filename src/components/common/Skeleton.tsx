import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
    className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={cn(
                "animate-shimmer rounded-md bg-white/5",
                className
            )}
        />
    );
};

export default Skeleton;
