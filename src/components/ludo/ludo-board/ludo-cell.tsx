import { CSSProperties, memo, useState, useEffect, useRef } from "react"
import LudoToken from "./ludo-token"
import clsx from "clsx"
import { Token } from "@/src/types/ludo"
import { cellColors } from "@/src/constants"

type LudoCellProps = {
    number: number
    cellTokens: Token[]
    style?: CSSProperties
    customCellClassName?: string
    handleTokenDrop: (token: Token, position?: number) => void
    canMoveTokens: boolean
    userColors: string[]
}

const LudoCell = memo(({
    customCellClassName,
    cellTokens,
    number,
    style,
    handleTokenDrop,
    canMoveTokens,
    userColors
}: LudoCellProps) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsSelectorOpen(false);
            }
        };

        if (isSelectorOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSelectorOpen]);

    const isStacked = cellTokens.length > 1;

    // Intercept click to toggle selector if stacked
    const handleCellClick = (e: React.MouseEvent, token: Token) => {
        if (isStacked) {
            // e.stopPropagation(); // Stop propagation to prevent board click?
            // Actually, if we click the cell, we want to toggle.
            // If the user clicks the token specifically:
            setIsSelectorOpen(prev => !prev);
        } else {
            handleTokenDrop(token, number);
        }
    };

    return (
        <div
            style={style}
            className={clsx("ludo-cell", customCellClassName, isStacked && "stacked")}
            onClick={(e) => {
                // If stacked and clicking the cell (not a token), toggle selector
                if (isStacked && e.target === e.currentTarget) {
                    e.stopPropagation();
                    setIsSelectorOpen(prev => !prev);
                }
            }}
        >
            {cellTokens.length > 0 && cellTokens.map((data) => (
                <LudoToken
                    key={`${data?.color}-${data?.sn}`}
                    {...data}
                    onClick={(e) => {
                        if (e) e.stopPropagation();
                        handleCellClick(e as unknown as React.MouseEvent, data);
                    }}
                    shouldPulse={canMoveTokens && userColors.includes(data.color)}
                />
            ))}

            {/* Token Selector Popup */}
            {
                isStacked && isSelectorOpen && (
                    <div
                        ref={selectorRef}
                        className="token-selector-popup"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Arrow */}
                        <div className="token-selector-arrow" />

                        {cellTokens.map((token) => (
                            <div
                                key={`select-${token.color}-${token.sn}`}
                                className="token-selector-item"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleTokenDrop(token, number);
                                    setIsSelectorOpen(false);
                                }}
                            >
                                <div
                                    className="token-selector-token"
                                    style={{
                                        backgroundColor: cellColors.find(c => c.color === token.color)?.style
                                    }}
                                />
                                {/* Token identifier */}
                                <div className="token-selector-label">
                                    #{token.sn}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
}, (prevProps, nextProps) => {
    // Custom comparison to ensure we only re-render if tokens, style or handler change
    return (
        prevProps.number === nextProps.number &&
        prevProps.handleTokenDrop === nextProps.handleTokenDrop &&
        prevProps.canMoveTokens === nextProps.canMoveTokens &&
        prevProps.userColors.join(",") === nextProps.userColors.join(",") &&
        prevProps.cellTokens.length === nextProps.cellTokens.length &&
        prevProps.cellTokens.every((t, i) =>
            t.color === nextProps.cellTokens[i].color &&
            t.sn === nextProps.cellTokens[i].sn
        ) &&
        prevProps.style?.backgroundColor === nextProps.style?.backgroundColor
    );
});

LudoCell.displayName = "LudoCell";

export default LudoCell;