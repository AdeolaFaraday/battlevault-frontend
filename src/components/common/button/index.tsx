import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import './styles.css';
import Loader from "../icons/Loader";
import { COLORS } from "@/src/constants";

type Props = {
    title: string;
    loading?: boolean;
    variant?: "primary" | "disabled";
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const btnVariant = {
    "primary": COLORS.primary,
    "disabled": COLORS.grey
}

const Button = ({
    title,
    loading,
    variant,
    ...rest
}: Props) => {
    return <div>
        <button
            style={{
                backgroundColor: btnVariant[variant || "primary"]
            }}
            className="button"
            {...rest}>
            {loading ? <Loader /> : title}
        </button>
    </div>
}

export default Button;