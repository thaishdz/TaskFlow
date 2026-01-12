import clsx from 'clsx'

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

// Extends native button props with custom 'type' for styled variants

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonProps = {
  type?: ButtonType
} & Omit<NativeButtonProps, 'type'>

export const Button = (props: ButtonProps) => {
  const { type, ...rest } = props
  const config = buttonConfig[type || 'add']
  const baseStyles = 'px-4 py-2 cursor-pointer transition-colors'
  return (
    <button
      {...rest}
      className={clsx(baseStyles, config.styles, props.className)} // Merge base styles + variant styles + user overrides
    >
      {!props.children && config.icon}
      {props.children}
    </button>
  )
}
