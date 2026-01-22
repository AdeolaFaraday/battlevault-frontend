import { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { FieldError } from "react-hook-form";

import './styles.css';

type Props = {
    decoration?: JSX.Element;
    label?: string;
    error?: FieldError;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({
    label,
    error,
    className,
    ...rest
}: Props) => {
    return <div className="input_container">
        {label && <div className="input_cta">
            <span className="input_label">{label}</span>
            {error && <span data-testid="input_error" className="input_error">{error?.message}</span>}
        </div>}
        <input className={`input ${className}`} {...rest} />
    </div>
}

export default Input