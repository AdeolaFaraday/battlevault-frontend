import { useCallback, useState } from "react";
import { cellColors } from "@/src/constants";

export type Token = {
    sn: number
    color: string
    active?: boolean
    position?: number
}

const useLudoAction = ({ color }: { color?: string }) => {
    const generateDefaultTokenStates = (color: string) => {
        return Array(4).fill(0).map((_, i) => {
            return {
                sn: i + 1,
                color,
                active: null,
                position: null
            }
        })
    }

    const [blueTokens, setBlueTokens] = useState<Token[]>(generateDefaultTokenStates("blue") as any)
    const [yellowTokens, setYellowTokens] = useState<Token[]>(generateDefaultTokenStates("yellow") as any)
    const [greenTokens, setGreenTokens] = useState<Token[]>(generateDefaultTokenStates("green") as any)
    const [redTokens, setRedTokens] = useState<Token[]>(generateDefaultTokenStates("red") as any)
    const findActiveTokens = [
        ...blueTokens,
        ...yellowTokens,
        ...redTokens,
        ...greenTokens

    ]?.filter((token) => token.active)
    const findBgColor = cellColors?.find((data) => data?.color === color)


    const tokenMapper = [
        {
            color: "blue",
            value: blueTokens,
            startPath: 41,
            setter: setBlueTokens,
        },
        {
            color: "green",
            value: greenTokens,
            startPath: 15,
            setter: setGreenTokens
        },
        {
            color: "yellow",
            value: yellowTokens,
            startPath: 28,
            setter: setYellowTokens
        },
        {
            color: "red",
            value: redTokens,
            startPath: 2,
            setter: setRedTokens
        }
    ]

    const handleTokenClick = (token: Token) => {
        const findSetter = tokenMapper?.find((data) => data?.color == token?.color)

        findSetter?.setter((prev: Token[]) => {
            const newItem = {
                ...token,
                position: findSetter?.startPath,
                active: true,
            }
            const exists = prev.some((item) => item.sn === token.sn);
            if (exists) {
                return [...prev.filter((item) => item.sn !== token.sn), newItem];
            }
            return prev
        })
    }

    return {
        findActiveTokens,
        blueTokens,
        yellowTokens,
        greenTokens,
        redTokens,
        findBgColor,
        handleTokenClick
    }
}

export default useLudoAction;