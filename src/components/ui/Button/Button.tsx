import { type ReactNode } from 'react'

type ButtonType = 'add' // here: considera usar union types para añadir más

const buttonConfig: Record<
  ButtonType,
  { styles: string; icon?: string; showIcon?: boolean }
> = {
  add: {
    styles: 'bg-yellow-500 hover:bg-yellow-600 text-black rounded-full',
    icon: '➕',
    showIcon: true,
  },
}

interface ButtonProps {
  type?: ButtonType
  children?: ReactNode // here: contenido del botón (text, icons, etc.)
  className?: string
  onClick: () => void // here: debe ser genérico porque aplicará a todos los botones
}

export const Button = ({
  type = 'add',
  className,
  children,
  onClick,
}: ButtonProps) => {
  const config = buttonConfig[type]
  const baseStyles = 'px-4 py-2 cursor-pointer transition-colors'
  return (
    // className= {base | tipo | overrides}
    <button
      type="button"
      className={`${baseStyles} ${config.styles} ${className || ''}`.trim()}
      onClick={onClick}
    >
      {!children && config.icon}
      {children}
    </button>
  )
}
