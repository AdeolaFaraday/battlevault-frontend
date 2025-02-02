import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import './styles.css';

type Props = {
    Icon?: React.ReactElement;
    title: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const SocialButton = ({
    Icon,
    title,
    ...rest
}: Props) => {
    return <button className="social_btn" {...rest}>
            {Icon}
            {title}
        </button>
}

export default SocialButton;