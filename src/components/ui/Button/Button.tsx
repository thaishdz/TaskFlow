import clsx from 'clsx'
import AddIcon from '@/assets/icons/add.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import BinIcon from '@/assets/icons/bin_24px.svg?react'
import SaveIcon from '@/assets/icons/save.svg?react'
import DraggableIcon from '@/assets/icons/hamburger.svg?react'
import CancelIcon from '@/assets/icons/cross_8px.svg?react'

type ButtonType =
  | 'add'
  | 'edit'
  | 'draggable'
  | 'link'
  | 'destructive'
  | 'success'
  | 'cancel'

const buttonConfig: Record<
  ButtonType,
  { styles: string; icon?: React.ReactNode }
> = {
  add: {
    styles: 'bg-slate-900 text-white rounded-full',
    icon: <AddIcon className="w-6 h-6" />,
  },
  edit: {
    styles: 'bg-white rounded-full border',
    icon: <EditIcon className="w-6 h-6" />,
  },
  draggable: {
    styles: 'bg-white',
    icon: <DraggableIcon className="w-6 h-6" />,
  },
  link: {
    styles: 'text-red-500',
    icon: <CancelIcon className="w-6 h-5 fill-red-500" />,
  },
  destructive: {
    styles: 'bg-red-400 hover:bg-red-600 px-25 rounded-xl',
    icon: <BinIcon className="w-6 h-5 fill-white" />,
  },
  success: {
    styles: 'w-fit bg-emerald-500 hover:bg-emerald-600 rounded-xl',
    icon: <SaveIcon className="w-6 h-6" />,
  },
  cancel: {
    styles: 'w-fit bg-slate-200 hover:bg-slate-300 rounded-xl',
    icon: <CancelIcon className="w-6 h-6" />,
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
