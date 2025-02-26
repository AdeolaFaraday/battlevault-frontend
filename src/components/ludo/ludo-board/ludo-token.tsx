import React from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";

type LudoToken = {
    color: string
    active?: boolean
    isInHomeColumn?: boolean
    onClick?: (e?: any) => void
}

const LudoToken = ({
    color = "red",
    active,
    isInHomeColumn,
    onClick
}: LudoToken) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)
    return (
        <motion.div
            className="ludo-token"
            style={{
                // width: size,
                // height: size,
                ...(isInHomeColumn && { visibility: active ? "visible" : "hidden" }),
                backgroundColor: findBgColor?.style,
            }}
            onClick={() => onClick && onClick() as any}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
        </motion.div>
    );
};

export default LudoToken;
