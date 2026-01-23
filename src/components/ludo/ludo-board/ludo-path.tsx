import { memo } from "react";
import clsx from "clsx";
import LudoCell from "./ludo-cell";
import { cellColors } from "@/src/constants";
import { Token } from "@/src/types/ludo";

type LudoPathProp = {
    customClassName?: string
    customRowClassName?: string
    customCellClassName?: string
    color: string
    tokenPositionMap: Record<number, { main: Token[]; safe: Token[] }>;
    startPathNumbers: number[]
    endPathNumbers: number[]
    middlePathNumbers: number[]
    startPathNumber: number
    handleTokenDrop: (token: Token, position?: number) => void
}

// TODO: create context provider to expose the findActiveTokens and handleTokenClick to the components 
// instead of passing down as props

const LudoPath = memo(({
    customClassName,
    customRowClassName,
    customCellClassName,
    color,
    startPathNumbers = [],
    endPathNumbers = [],
    middlePathNumbers = [],
    startPathNumber,
    tokenPositionMap,
    handleTokenDrop
}: LudoPathProp) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)

    return <div className={clsx("ludo-cell__container", customClassName)}>
        <div className={clsx("", customRowClassName)}>
            {startPathNumbers.map((number) => (
                <LudoCell
                    key={number}
                    tokens={tokenPositionMap[number]?.main || []}
                    customCellClassName={customCellClassName}
                    number={number}
                    style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {middlePathNumbers.map((number) => (
                <LudoCell
                    key={number}
                    tokens={tokenPositionMap[number]?.safe || []}
                    customCellClassName={customCellClassName}
                    isSafePath={number !== Math.min(...middlePathNumbers)}
                    number={number}
                    style={{ backgroundColor: number !== Math.min(...middlePathNumbers) ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {endPathNumbers.map((number) => (
                <LudoCell
                    key={number}
                    tokens={tokenPositionMap[number]?.main || []}
                    customCellClassName={customCellClassName}
                    number={number}
                    style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
    </div>
});

LudoPath.displayName = "LudoPath";

export default LudoPath;