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

    return (
        <motion.div
            layoutId={`${color}-${sn}`}
            layout="position"
            className="ludo-token"
            style={{
                // width: size,
                // height: size,
                // opacity: isDragging ? 0.5 : 1,
                touchAction: "none",
                ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                backgroundColor: findBgColor?.style,
                willChange: "transform",
            }}
            transition={{
                // type: "tween",
                ease: "linear",
                duration: 0.2
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
        </motion.div>
    );
});

LudoToken.displayName = "LudoToken";

export default LudoToken;
