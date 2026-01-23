import { CSSProperties, memo, RefObject } from "react"
import { useDrop } from "react-dnd"
import LudoToken from "./ludo-token"
import clsx from "clsx"
import { Token } from "@/src/types/ludo"

type LudoCellProp = {
    number: number
    isSafePath?: boolean
    tokens: Token[]
    style?: CSSProperties
    customCellClassName?: string
    handleTokenDrop: (token: Token, position?: number) => void
}

const LudoCell = memo(({
    customCellClassName,
    tokens,
    number,
    style,
    handleTokenDrop,
}: LudoCellProp) => {
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
    const cellTokens = tokens || [];

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
});

LudoCell.displayName = "LudoCell";

export default LudoCell;