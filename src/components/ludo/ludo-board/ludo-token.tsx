import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { cellColors } from "@/src/constants";
import { useDrag } from "react-dnd";
import { Preview } from 'react-dnd-preview';

type LudoToken = {
    isInHomeColumn?: boolean
    homeActive?: boolean
    onClick?: (e?: object) => void
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
    console.log({ onClick });
    // onClick is passed but not currently used in this component
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

    const generatePreview = ({ style }: { style: object }) => {
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
                ref={dragRef as unknown as RefObject<HTMLDivElement>}
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
