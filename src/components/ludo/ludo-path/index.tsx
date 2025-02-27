"use client"
import clsx from "clsx";
import LudoToken from "../ludo-board/ludo-token";
import useLudoAction, { Token } from "@/src/hooks/ludo/useLudoAction";
import LudoCell from "./ludo-cell";

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
    //TODO
    const {
        findBgColor,
    } = useLudoAction({ color })


    return <div className={clsx("ludo-cell__container", customClassName)}>
        <div className={clsx("", customRowClassName)}>
            {startPathNumbers.map((number, i) => (
                <LudoCell
                    key={number}
                    findActiveTokens={findActiveTokens}
                    customCellClassName={customCellClassName}
                    startPathNumber={startPathNumber}
                    number={number}
                    color={color}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
        {/* TODO */}
        <div className={clsx("", customRowClassName)}>
            {middlePathNumbers.map((number, i) => (
                <div key={number} style={{ backgroundColor: number !== Math.min(...middlePathNumbers) ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>
                    {findActiveTokens?.map((data, key) => (
                        <span key={data?.position}>
                            {number === data?.position ? <LudoToken {...data} /> : <></>}
                        </span>
                    ))}
                </div>
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {endPathNumbers.map((number, i) => (
                <LudoCell
                    key={number}
                    findActiveTokens={findActiveTokens}
                    customCellClassName={customCellClassName}
                    startPathNumber={startPathNumber}
                    number={number}
                    color={color}
                    handleTokenDrop={handleTokenDrop}
                />
            ))}
        </div>
    </div>
}

export default LudoPath;