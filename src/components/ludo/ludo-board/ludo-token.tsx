import React, { memo } from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";
import { Token } from "@/src/types/ludo";

type LudoTokenProps = {
    isInHomeColumn?: boolean
    homeActive?: boolean
    onClick?: (e?: object) => void
} & Token

const LudoToken = memo(({
    color = "red",
    // active,
    homeActive,
    sn,
    // position,
    isInHomeColumn,
    onClick
}: LudoTokenProps) => {
    // onClick is passed but not currently used in this component
    const findBgColor = cellColors?.find((data) => data?.color === color)
    const isDragging = false; // Mocking isDragging since hook is removed

    return (
        <motion.div
            layoutId={`${color}-${sn}`}
            className="ludo-token"
            style={{
                // width: size,
                // height: size,
                opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
                ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                backgroundColor: findBgColor?.style,
                willChange: "transform, opacity",
            }}
            transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.3
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
        </motion.div>
    );
});

LudoToken.displayName = "LudoToken";

export default LudoToken;
