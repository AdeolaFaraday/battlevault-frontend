"use client"
import React, { memo } from "react";
import clsx from "clsx";
import LudoToken from "./ludo-token";
import { Token } from "@/src/types/ludo";

const LudoHomeColumn = memo(({
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
                {[...(token || [])]?.sort((a, b) => a.sn - b.sn).filter((data) => !data?.active).map((data) => (
                    <LudoToken
                        {...data}
                        isInHomeColumn
                        homeActive={!data?.position}
                        active={data?.active}
                        key={`${color}-${data.sn}`}
                        color={color}
                        onClick={() => handleTokenClick(data)}
                    />
                ))}
            </div>
        </div>
    </div>
}, (prevProps, nextProps) => {
    return (
        prevProps.color === nextProps.color &&
        prevProps.customClassName === nextProps.customClassName &&
        prevProps.handleTokenClick === nextProps.handleTokenClick &&
        prevProps.token?.length === nextProps.token?.length &&
        (prevProps.token || []).every((t, i) =>
            t.color === nextProps.token[i].color &&
            t.sn === nextProps.token[i].sn &&
            t.position === nextProps.token[i].position &&
            t.active === nextProps.token[i].active
        )
    );
});

LudoHomeColumn.displayName = "LudoHomeColumn";

export default LudoHomeColumn;