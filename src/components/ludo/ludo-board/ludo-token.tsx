import React from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";

type LudoToken = {
    isInHomeColumn?: boolean
    homeActive?: boolean
    onClick?: (e?: object) => void
} & Token

const LudoToken = ({
    color = "red",
    // active,
    homeActive,
    sn,
    // position,
    isInHomeColumn,
    onClick
}: LudoToken) => {
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
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
        </motion.div>
    );
};

export default LudoToken;
