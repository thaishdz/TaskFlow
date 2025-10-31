import { type ReactNode } from "react";


type ButtonType = 'add'

const buttonConfig: Record<ButtonType, {styles: string, icon?: string }> = {
    add: {
        styles: 'bg-blue-500 hover:bg-blue-600 text-white rounded-full',
        icon: '➕'
    },
    // primary: {...}
}
interface ButtonProps {
    type?: ButtonType;
    children?: ReactNode; // Contenido del botón (text, icons, etc.)
    className?: string;
}

export const Button = ({type = 'add', className, children}: ButtonProps) => {
    const config = buttonConfig[type]
    return (
        <button className={`${config.styles} ${className || ''}px-4 py-2`}>
            {config.icon && <span>{config.icon}</span>}
            {children}
        </button>
    )
}