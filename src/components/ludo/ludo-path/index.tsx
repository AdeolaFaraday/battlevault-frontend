import clsx from "clsx";


const cellColors = [
    {
        color: "yellow",
        style: "var(--primary-color-yellow)"
    },
    {
        color: "red",
        style: "var(--primary-color-red)"
    },
    {
        color: "green",
        style: "var(--primary-color-green)"
    },
    {
        color: "blue",
        style: "var(--primary-color-blue)"
    },
]

const LudoPath = ({
    customClassName,
    customRowClassName,
    customCellClassName,
    color,
    startPathNumbers = [],
    endPathNumbers = [],
    middlePathNumbers = [],
    startPathNumber,
}: {
    customClassName?: string
    customRowClassName?: string
    customCellClassName?: string
    color: string
    startPathNumbers: number[]
    endPathNumbers: number[]
    middlePathNumbers: number[]
    startPathNumber: number
}) => {
    const findBgColor = cellColors?.find((data) => data?.color === color)
    return <div className={clsx("ludo-cell__container", customClassName)}>
        <div className={clsx("", customRowClassName)}>
            {startPathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>{number}</div>
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {middlePathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number !== Math.min(...middlePathNumbers) ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>{number}</div>
            ))}
        </div>
        <div className={clsx("", customRowClassName)}>
            {endPathNumbers.map((number, i) => (
                <div key={i} style={{ backgroundColor: number === startPathNumber ? findBgColor?.style : "transparent" }} className={clsx("ludo-cell", customCellClassName)}>{number}</div>
            ))}
        </div>
    </div>
}

export default LudoPath;