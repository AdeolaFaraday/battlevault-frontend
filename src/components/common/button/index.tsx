import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import './styles.css';

type Props = {
    title: string;
    loading?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({
    title,
    loading,
    ...rest
}: Props) => {
    return <div>
        <button {...rest} className="button">{title}</button>
    </div>
}

export default Button;