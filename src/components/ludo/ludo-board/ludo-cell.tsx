import { CSSProperties } from "react"
import { useDrop } from "react-dnd"
import LudoToken from "./ludo-token"
import clsx from "clsx"
import { Token } from "@/src/hooks/ludo/useLudoAction"

type LudoPathProp = {
    number: number
    findActiveTokens: any[]
    style?: CSSProperties
    customCellClassName?: string
    handleTokenDrop: (token: Token, position?: number) => void
}

const LudoCell = ({
    customCellClassName,
    findActiveTokens,
    number,
    style,
    handleTokenDrop
}: LudoPathProp) => {
    const [_, dropRef] = useDrop(() => ({
        accept: "ITEM",
        drop: (item: Token) => {
            console.log({ item, number });
            handleTokenDrop(item, number)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    return <div ref={dropRef as any} style={style} className={clsx("ludo-cell", customCellClassName)}>
        {findActiveTokens?.map((data, _) => (
            <span key={`${data?.color}${data?.position}`}>
                {number === data?.position ? <LudoToken {...data} /> : <></>}
            </span>
        ))}
    </div>
}

export default LudoCell;