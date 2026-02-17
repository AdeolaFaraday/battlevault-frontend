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
    stackedIndex?: number
    isStacked?: boolean
} & Token

// Stacking positions
const stackOffsets = [
    { x: "-18%", y: "-18%", z: 10 },
    { x: "18%", y: "18%", z: 20 },
    { x: "-18%", y: "18%", z: 30 },
    { x: "18%", y: "-18%", z: 40 },
];

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
    isMoving,
    stackedIndex = 0,
    isStacked
}: LudoTokenProps) => {
    // onClick is passed but not currently used in this component
    const findBgColor = cellColors?.find((data) => data?.color === color)

    return (
        <motion.div
            id={`token-${color}-${sn}`}
            layoutId={disableAnim ? undefined : `${color}-${sn}`}
            layout={disableAnim ? undefined : "position"}
            className={clsx("ludo-token", isMoving && "cursor-wait")}
            style={{
                touchAction: "none",
                ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                willChange: "transform",
            }}
            transition={{
                layout: {
                    type: "tween",
                    ease: "linear",
                    duration: 0.2
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (!isMoving) onClick?.(e);
            }}
        >
            <motion.div
                className="ludo-token-inner"
                style={{
                    backgroundColor: findBgColor?.style,
                    zIndex: isStacked ? stackOffsets[stackedIndex]?.z : 1,
                }}
                animate={
                    isMoving ? {
                        scale: 1,
                        x: 0,
                        y: 0,
                        boxShadow: "0 0 0px rgba(255,255,255,0)"
                    } : {
                        x: isStacked ? stackOffsets[stackedIndex]?.x : 0,
                        y: isStacked ? stackOffsets[stackedIndex]?.y : 0,
                        scale: shouldPulse ? [1, 1.25, 1] : 1,
                        boxShadow: shouldPulse ? [
                            "0 0 0px rgba(255,215,0,0)",
                            "0 0 25px rgba(255,215,0,0.9)",
                            "0 0 0px rgba(255,215,0,0)"
                        ] : "0 0 0px rgba(255,255,255,0)"
                    }
                }
                transition={{
                    x: { duration: 0.2 },
                    y: { duration: 0.2 },
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
            >
                {isMoving && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
});

LudoToken.displayName = "LudoToken";

export default LudoToken;
