import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
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
    return <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ opacity: 0.8, y: -3 }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
    >
        <button
            style={{
                backgroundColor: btnVariant[variant || "primary"]
            }}
            className={clsx("button", customClassName)}
            {...rest}>
            {loading ? <Loader /> : title}
        </button>
    </motion.div>
}

export default Button;