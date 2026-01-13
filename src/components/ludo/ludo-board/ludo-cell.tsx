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
    return <div ref={dropRef as unknown as RefObject<HTMLDivElement>} style={style} className={clsx("ludo-cell", customCellClassName)}>
        {findActiveTokens?.map((data) => (
            <span key={`${data?.color}-${data?.sn}`}>
                {isSafePath && data.isSafePath ? (
                    <LudoToken {...data} onClick={() => handleTokenDrop(data, number)} />
                ) : (number === data?.position && !data.isSafePath && !isSafePath) ? (
                    <LudoToken {...data} onClick={() => handleTokenDrop(data, number)} />
                ) : <></>}
            </span>
        ))}
    </div>
}

export default LudoCell;