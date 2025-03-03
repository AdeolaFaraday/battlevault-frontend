"use client"
import clsx from "clsx";
import LudoToken from "./ludo-token";
import { Token } from "@/src/hooks/ludo/useLudoValues";

const LudoHomeColumn = ({
    customClassName,
    color,
    token,
    handleTokenClick
}: {
    customClassName?: string
    color: string
    token: Token[]
    handleTokenClick: (e?: any) => void
}) => {
    return <div className={clsx("ludo-home__column", customClassName)}>
        <div className="ludo-token__container">
            <div className="ludo-token__grid">
                {token?.sort((a, b) => a.sn - b.sn).map((data, key) => <LudoToken {...data} isInHomeColumn homeActive={!data?.position} key={key} color={color} onClick={() => handleTokenClick(data)} />)}
            </div>
        </div>
    </div>
}

export default LudoHomeColumn;