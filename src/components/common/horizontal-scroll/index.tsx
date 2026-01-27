"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
    itemClassName?: string;
    onReachEnd?: () => void;
}

const HorizontalScroll = ({
    children,
    className,
    itemClassName,
    onReachEnd
}: HorizontalScrollProps) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!onReachEnd || !scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Trigger when user is 100px away from the end
        if (scrollLeft + clientWidth >= scrollWidth - 100) {
            onReachEnd();
        }
    };

    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className={cn(
                    "flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x snap-mandatory scroll-smooth",
                    "px-4 md:px-0", // Bleed to edges on mobile, align on desktop
                    itemClassName
                )}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {React.Children.map(children, (child) => (
                    <div className="snap-start shrink-0">
                        {child}
                    </div>
                ))}
            </div>

            {/* CSS to hide scrollbar while keeping functionality */}
            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default HorizontalScroll;
