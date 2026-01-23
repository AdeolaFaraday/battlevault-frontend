import React, { memo } from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";
import { Token } from "@/src/types/ludo";

type LudoTokenProp = {
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
}: LudoTokenProp) => {
    // onClick is passed but not currently used in this component
    const findBgColor = cellColors?.find((data) => data?.color === color)
    const isDragging = false; // Mocking isDragging since hook is removed

    return (
        <motion.div
            layout
            layoutId={`${color}-${sn}`}
            className="ludo-token"
            style={{
                opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
                ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                backgroundColor: findBgColor?.style,
            }}
            initial={false}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                zIndex: 50
            }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-2 rounded-full border-2 border-white/30" />
        </motion.div>
    );
});

LudoToken.displayName = "LudoToken";

export default LudoToken;
