import React from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";
import { useDrag } from "react-dnd";
import { Preview } from 'react-dnd-preview';

type LudoToken = {
    isInHomeColumn?: boolean
    homeActive?: boolean
    onClick?: (e?: any) => void
} & Token

const LudoToken = ({
    color = "red",
    active,
    homeActive,
    sn,
    position,
    isInHomeColumn,
    onClick
}: LudoToken) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: {
            sn,
            color,
            active,
            position
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const generatePreview = ({ itemType, item, style }: any) => {
        return <div style={{
            ...style,
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "100px",
            backgroundColor: findBgColor?.style
        }}>
            <motion.div
                className="ludo-token"
                draggable
                style={{
                    touchAction: "none",
                    backgroundColor: findBgColor?.style,
                }}
            >
            </motion.div>
        </div>
    }
    return (
        <>
            <Preview>{generatePreview}</Preview>

            <motion.div
                ref={dragRef as any}
                className="ludo-token"
                draggable
                style={{
                    // width: size,
                    // height: size,
                    opacity: isDragging ? 0.5 : 1,
                    touchAction: "none",
                    ...(isInHomeColumn && { visibility: homeActive ? "visible" : "hidden" }),
                    backgroundColor: findBgColor?.style,
                }}
                // onClick={() => onClick && onClick() as any}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
            </motion.div>
        </>
    );
};

export default LudoToken;
