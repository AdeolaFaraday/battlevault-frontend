import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DropdownMenuItemProps {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    className?: string;
    variant?: 'default' | 'danger';
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
    icon: Icon,
    label,
    onClick,
    className = '',
    variant = 'default'
}) => {
    const baseStyles = "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left";

    const variantStyles = {
        default: "text-slate-300 hover:text-white hover:bg-white/5",
        danger: "text-red-400 hover:text-red-300 hover:bg-red-500/10"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            <Icon size={16} />
            {label}
        </button>
    );
};

export default DropdownMenuItem;
