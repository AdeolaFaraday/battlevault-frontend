import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import LudoToken from "./ludo-token"
import clsx from "clsx"
import { RefObject } from "react"

type LudoPathProp = {
    number: number
    isSafePath?: boolean
    findActiveTokens: Token[]
    style?: CSSProperties
    customCellClassName?: string
    handleTokenDrop: (token: Token, position?: number) => void
}

const LudoCell = ({
    customCellClassName,
    findActiveTokens,
    number,
    style,
    handleTokenDrop,
    isSafePath
}: LudoPathProp) => {
    const [, dropRef] = useDrop(() => ({
        accept: "ITEM",
        drop: (item: Token) => {
            console.log({ item, number });
            handleTokenDrop(item, number)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    const cellTokens = findActiveTokens?.filter((token) => {
        if (isSafePath) {
            return token.isSafePath && token.position === number;
        }
        return !token.isSafePath && token.position === number;
    }) || [];

    const isStacked = cellTokens.length > 1;

    return <div ref={dropRef as unknown as RefObject<HTMLDivElement>} style={style} className={clsx("ludo-cell", customCellClassName, isStacked && "stacked")}>
        {cellTokens.length > 0 ? (
            cellTokens.map((data) => (
                <LudoToken key={`${data?.color}-${data?.sn}`} {...data} onClick={() => handleTokenDrop(data, number)} />
            ))
        ) : (
            <></>
        )}
    </div>
}

export default LudoCell;