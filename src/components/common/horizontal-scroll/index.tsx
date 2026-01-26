"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
    itemClassName?: string;
}

const HorizontalScroll = ({
    children,
    className,
    itemClassName
}: HorizontalScrollProps) => {
    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <div
                className={cn(
                    "flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x snap-mandatory scroll-smooth",
                    "px-4 md:px-0 -mx-4 md:mx-0", // Bleed to edges on mobile, align on desktop
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
