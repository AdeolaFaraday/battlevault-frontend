"use client"
import clsx from "clsx";
import LudoCell from "./ludo-cell";
import { cellColors } from "@/src/constants";

type LudoPathProp = {
    customClassName?: string
    customRowClassName?: string
    customCellClassName?: string
    color: string
    findActiveTokens: any[]
    startPathNumbers: number[]
    endPathNumbers: number[]
    middlePathNumbers: number[]
    startPathNumber: number
    handleTokenDrop: (token: Token, position?: number) => void
}

// TODO: create context provider to expose the findActiveTokens and handleTokenClick to the components 
// instead of passing down as props

const LudoPath = ({
    customClassName,
    customRowClassName,
    customCellClassName,
    color,
    startPathNumbers = [],
    endPathNumbers = [],
    middlePathNumbers = [],
    startPathNumber,
    findActiveTokens,
    handleTokenDrop
}: LudoPathProp) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)

    return <div className={clsx("ludo-cell__container", customClassName)}>
        <div className={clsx("", customRowClassName)}>
            {startPathNumbers.map((number, i) => (
                <LudoCell
                    key={number}
                    findActiveTokens={findActiveTokens}
                    customCellClassName={customCellClassName}
                    number={number}
                    style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {middlePathNumbers.map((number, i) => (
                <LudoCell
                    key={number}
                    findActiveTokens={findActiveTokens}
                    customCellClassName={customCellClassName}
                    isSafePath
                    number={number}
                    style={{ backgroundColor: number !== Math.min(...middlePathNumbers) ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {endPathNumbers.map((number, i) => (
                <LudoCell
                    key={number}
                    findActiveTokens={findActiveTokens}
                    customCellClassName={customCellClassName}
                    number={number}
                    style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
    </div>
}

export default LudoPath;