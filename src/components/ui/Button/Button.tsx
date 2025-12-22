import { type ReactNode } from 'react'

type ButtonType = 'add' | 'edit' | 'save' | 'cancel'

const buttonConfig: Record<
  ButtonType,
  { styles: string; icon?: string; showIcon?: boolean }
> = {
  add: {
    styles: 'bg-yellow-500 hover:bg-yellow-600 text-black rounded-full',
    icon: '➕',
    showIcon: true,
  },
  edit: {
    styles: 'bg-white hover:bg-yellow-200 text-black border rotate-90',
    icon: '✏️',
    showIcon: true,
  },
  save: {
    styles:
      'bg-green-400 px-25 hover:bg-green-300 hover:ring-4 hover:ring-green-500 rounded-xl',
    icon: '💾',
    showIcon: true,
  },
  cancel: {
    styles:
      'bg-red-400 px-25 hover:bg-red-300 hover:ring-4 hover:ring-red-500 rounded-xl',
    icon: '✕',
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
