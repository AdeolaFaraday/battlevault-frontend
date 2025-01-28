import { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import './styles.css';

type Props = {
    decoration?: JSX.Element;
    label?: string;
    error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({
    label,
    error,
    ...rest
}: Props) => {
    return <div className="input_container">
        {label && <span className="input_label">{label}</span>}
        <input className="input" {...rest} />
    </div>
}

export default Input