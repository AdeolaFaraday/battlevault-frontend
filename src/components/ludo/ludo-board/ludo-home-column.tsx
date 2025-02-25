import clsx from "clsx";

const LudoHomeColumn = ({
    customClassName
}: {
    customClassName?: string
}) => {
    return <div className={clsx("ludo-home__column", customClassName)}>
        <div className="ludo-token__container"></div>
    </div>
}

export default LudoHomeColumn;