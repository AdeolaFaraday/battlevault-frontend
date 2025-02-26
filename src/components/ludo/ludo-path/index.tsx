"use client"
import clsx from "clsx";
import LudoToken from "../ludo-board/ludo-token";
import useLudoAction from "@/src/hooks/ludo/useLudoAction";

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
    findActiveTokens
}: LudoPathProp) => {
    const {
        findBgColor,
    } = useLudoAction({ color })

    return <div className={clsx("ludo-cell__container", customClassName)}>
        <div className={clsx("", customRowClassName)}>
            {startPathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>
                    {findActiveTokens?.map((data, key) => (
                        <span key={key}>
                            {number === data?.position ? <LudoToken color={data?.color} /> : <></>}
                        </span>
                    ))}
                </div>
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {middlePathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number !== Math.min(...middlePathNumbers) ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>
                    {findActiveTokens?.map((data, key) => (
                        <span key={key}>
                            {number === data?.position ? <LudoToken color={data?.color} /> : <></>}
                        </span>
                    ))}
                </div>
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {endPathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>
                    {findActiveTokens?.map((data, key) => (
                        <span key={key}>
                            {number === data?.position ? <LudoToken color={data?.color} /> : <></>}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
}

export default LudoPath;