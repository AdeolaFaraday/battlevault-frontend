import React, { memo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { cellColors } from "@/src/constants";
import { Token } from "@/src/types/ludo";

type LudoTokenProps = {
    isInHomeColumn?: boolean
    homeActive?: boolean
    onClick?: (e: React.MouseEvent) => void
    disableAnim?: boolean // New prop
    isMoving?: boolean
    shouldPulse?: boolean
} & Token

const LudoToken = memo(({
    color = "red",
    // active,
    homeActive,
    sn,
    // position,
    isInHomeColumn,
    onClick,
    disableAnim,
    shouldPulse,
    isMoving
}: LudoTokenProps) => {
    // onClick is passed but not currently used in this component
    const findBgColor = cellColors?.find((data) => data?.color === color)

    return (
        <motion.div
            layoutId={disableAnim ? undefined : `${color}-${sn}`}
            layout={disableAnim ? undefined : "position"}
            className={clsx("ludo-token", isMoving && "cursor-wait")}
            style={{
                // width: size,
                // height: size,
                // opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
                ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                backgroundColor: findBgColor?.style,
                willChange: "transform",
            }}
            animate={shouldPulse && !isMoving ? {
                scale: [1, 1.25, 1],
                boxShadow: [
                    "0 0 0px rgba(255,215,0,0)",
                    "0 0 25px rgba(255,215,0,0.9)",
                    "0 0 0px rgba(255,215,0,0)"
                ]
            } : {
                scale: 1,
                boxShadow: "0 0 0px rgba(255,255,255,0)"
            }}
            transition={{
                layout: {
                    type: "tween",
                    ease: "linear",
                    duration: 0.2
                },
                scale: shouldPulse && !isMoving ? {
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : {
                    duration: 0.2
                },
                boxShadow: shouldPulse && !isMoving ? {
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : {
                    duration: 0.2
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (!isMoving) onClick?.(e);
            }}
        >
            {isMoving && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                </div>
            )}
        </motion.div>
    );
});

LudoToken.displayName = "LudoToken";

export default LudoToken;
