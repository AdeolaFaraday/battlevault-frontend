import { CSSProperties, memo, RefObject } from "react"
import { useDrop } from "react-dnd"
import LudoToken from "./ludo-token"
import clsx from "clsx"
import { Token } from "@/src/types/ludo"

type LudoCellProps = {
    number: number
    cellTokens: Token[]
    style?: CSSProperties
    customCellClassName?: string
    handleTokenDrop: (token: Token, position?: number) => void
}

const LudoCell = memo(({
    customCellClassName,
    cellTokens,
    number,
    style,
    handleTokenDrop,
}: LudoCellProps) => {
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

    const isStacked = cellTokens.length > 1;

    return (
        <div
            ref={dropRef as unknown as RefObject<HTMLDivElement>}
            style={style}
            className={clsx("ludo-cell", customCellClassName, isStacked && "stacked")}
        >
            {cellTokens.length > 0 && cellTokens.map((data) => (
                <LudoToken
                    key={`${data?.color}-${data?.sn}`}
                    {...data}
                    onClick={() => handleTokenDrop(data, number)}
                />
            ))}
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison to ensure we only re-render if tokens, style or handler change
    return (
        prevProps.number === nextProps.number &&
        prevProps.handleTokenDrop === nextProps.handleTokenDrop &&
        prevProps.cellTokens.length === nextProps.cellTokens.length &&
        prevProps.cellTokens.every((t, i) =>
            t.color === nextProps.cellTokens[i].color &&
            t.sn === nextProps.cellTokens[i].sn
        ) &&
        JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)
    );
});

LudoCell.displayName = "LudoCell";

export default LudoCell;