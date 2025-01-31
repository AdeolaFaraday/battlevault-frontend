import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import './styles.css';
import Loader from "../icons/Loader";

type Props = {
    title: string;
    loading?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({
    title,
    loading,
    ...rest
}: Props) => {
    return <div className="button">
        {loading ? <Loader /> : <button disabled={loading} {...rest}>{title}</button>}
    </div>
}

export default Button;