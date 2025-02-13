import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import './styles.css';
import Loader from "../icons/Loader";
import { COLORS } from "@/src/constants";

type Props = {
    title: string;
    loading?: boolean;
    variant?: "primary" | "disabled";
    customClassName?: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const btnVariant = {
    "primary": COLORS.primary,
    "disabled": COLORS.grey
}

const Button = ({
    title,
    loading,
    variant,
    customClassName,
    ...rest
}: Props) => {
    return <div>
        <button
            style={{
                backgroundColor: btnVariant[variant || "primary"]
            }}
            className={clsx("button", customClassName)}
            {...rest}>
            {loading ? <Loader /> : title}
        </button>
    </div>
}

export default Button;