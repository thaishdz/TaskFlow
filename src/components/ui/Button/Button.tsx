import clsx from 'clsx'
import AddIcon from '@/assets/icons/add.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import BinIcon from '@/assets/icons/bin_24px.svg?react'
import CancelIcon from '@/assets/icons/cross_8px.svg?react'

type ButtonType = 'add' | 'edit' | 'remove' | 'save' | 'cancel'

const buttonConfig: Record<
  ButtonType,
  { styles: string; icon?: React.ReactNode }
> = {
  add: {
    styles: 'bg-yellow-500 hover:bg-yellow-600 text-black rounded-full',
    icon: <AddIcon className="w-6 h-6 fill-white" />,
  },
  edit: {
    styles: 'bg-white text-black',
    icon: <EditIcon className="w-6 h-6" />,
  },
  save: {
    styles: 'bg-green-400 px-10 hover:ring-4 rounded-xl',
    icon: '💾',
  },
  remove: {
    styles: 'bg-red-400 px-25 rounded-xl',
    icon: <BinIcon className="w-6 h-5 fill-white" />,
  },
  cancel: {
    styles: 'bg-red-400 px-10 py-5 hover:ring-4 hover:ring-red-500 rounded-xl',
    icon: <CancelIcon className="w-6 h-6 fill-white" />,
  },
}

// Extends native button props with custom 'type' for styled variants

type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonProps = {
  variant?: ButtonType
  showIcon?: boolean
} & Omit<NativeButtonProps, 'type'>

export const Button = (props: ButtonProps) => {
  const { variant, showIcon = true, ...rest } = props
  const config = buttonConfig[variant || 'add']
  const baseStyles = 'px-4 py-2 cursor-pointer transition-colors'
  return (
    <button
      type="button"
      {...rest}
      className={clsx(baseStyles, config.styles, props.className)} // Merge base styles + variant styles + user overrides
    >
      {showIcon && config.icon}
      {props.children}
    </button>
  )
}
