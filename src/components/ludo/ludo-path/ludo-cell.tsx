import { useDrop } from "react-dnd"
import LudoToken from "../ludo-board/ludo-token"
import clsx from "clsx"
import useLudoAction, { Token } from "@/src/hooks/ludo/useLudoAction"

type LudoPathProp = {
    customCellClassName?: string
    number: number
    color: string
    findActiveTokens: any[]
    startPathNumber: number
    handleTokenDrop: (token: Token, position?: number) => void
}

const LudoCell = ({
    customCellClassName,
    startPathNumber,
    findActiveTokens,
    number,
    color,
    handleTokenDrop
}: LudoPathProp) => {
    //TODO
    const {
        findBgColor
    } = useLudoAction({ color })

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
    return <div ref={dropRef as any} style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>
        {findActiveTokens?.map((data, key) => (
            <span key={data?.position}>
                {number === data?.position ? <LudoToken {...data} /> : <></>}
            </span>
        ))}
    </div>
}

export default LudoCell;