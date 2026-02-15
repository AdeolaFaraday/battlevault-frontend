import { memo } from "react";
import clsx from "clsx";
import LudoCell from "./ludo-cell";
import { cellColors } from "@/src/constants";
import { Token } from "@/src/types/ludo";

type LudoPathProps = {
    customClassName?: string
    customRowClassName?: string
    customCellClassName?: string
    color: string
    tokensByCell: Record<string, Token[]>
    startPathNumbers: number[]
    endPathNumbers: number[]
    middlePathNumbers: number[]
    startPathNumber: number
    handleTokenDrop: (token: Token, position?: number) => void
    canMoveTokens: boolean
    userColors: string[]
    selectorPosition?: 'above' | 'below'
    movingToken?: { id: number, color: string } | null
}

const LudoPath = memo(({
    customClassName,
    customRowClassName,
    customCellClassName,
    color,
    startPathNumbers = [],
    endPathNumbers = [],
    middlePathNumbers = [],
    startPathNumber,
    tokensByCell,
    handleTokenDrop,
    canMoveTokens,
    userColors,
    selectorPosition = 'above',
    movingToken
}: LudoPathProps) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)

    return (
        <div className={clsx("ludo-cell__container", customClassName)}>
            <div className={clsx("", customRowClassName)}>
                {startPathNumbers.map((number) => (
                    <LudoCell
                        key={number}
                        cellTokens={tokensByCell[number.toString()] || []}
                        customCellClassName={customCellClassName}
                        number={number}
                        style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                        handleTokenDrop={handleTokenDrop}
                        canMoveTokens={canMoveTokens}
                        userColors={userColors}
                        selectorPosition={selectorPosition}
                        movingToken={movingToken}
                    />
                ))}
            </div>
            <div className={clsx("", customRowClassName)}>
                {middlePathNumbers.map((number) => {
                    const isEntryCell = number === Math.min(...middlePathNumbers);
                    const cellId = isEntryCell ? number.toString() : `safe-${number}`;
                    return (
                        <LudoCell
                            key={number}
                            cellTokens={tokensByCell[cellId] || []}
                            customCellClassName={customCellClassName}
                            number={number}
                            style={{ backgroundColor: !isEntryCell ? findBgColor?.style : "transparent" }}
                            handleTokenDrop={handleTokenDrop}
                            canMoveTokens={canMoveTokens}
                            userColors={userColors}
                            selectorPosition={selectorPosition}
                            movingToken={movingToken}
                        />
                    );
                })}
            </div>
            <div className={clsx("", customRowClassName)}>
                {endPathNumbers.map((number) => (
                    <LudoCell
                        key={number}
                        cellTokens={tokensByCell[number.toString()] || []}
                        customCellClassName={customCellClassName}
                        number={number}
                        style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                        handleTokenDrop={handleTokenDrop}
                        canMoveTokens={canMoveTokens}
                        userColors={userColors}
                        selectorPosition={selectorPosition}
                        movingToken={movingToken}
                    />
                ))}
            </div>
        </div>
    );
});

LudoPath.displayName = "LudoPath";

export default LudoPath;