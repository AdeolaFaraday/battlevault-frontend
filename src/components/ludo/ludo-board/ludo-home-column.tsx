"use client"
import clsx from "clsx";
import LudoToken from "./ludo-token";
import { Token } from "@/src/types/ludo";

const LudoHomeColumn = ({
    customClassName,
    color,
    token,
    handleTokenClick
}: {
    customClassName?: string
    color: string
    token: Token[]
    handleTokenClick: (token: Token) => void
}) => {
    return <div className={clsx("ludo-home__column", customClassName)}>
        <div className="ludo-token__container">
            <div className="ludo-token__grid">
                {[...(token || [])]?.sort((a, b) => a.sn - b.sn).filter((data) => !data?.active).map((data) => <LudoToken {...data} isInHomeColumn homeActive={!data?.position} active={data?.active} key={`${color}-${data.sn}`} color={color} onClick={() => handleTokenClick(data)} />)}
            </div>
        </div>
    </div>
}

export default LudoHomeColumn;