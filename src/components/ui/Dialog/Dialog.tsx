import type { ReactNode } from 'react'
import CancelIcon from '@/assets/icons/cross_8px.svg?react'

interface DialogProps {
  visible: boolean
  children: ReactNode
  onClose: () => void
}
export const Dialog = ({ visible = false, children, onClose }: DialogProps) => {
  if (!visible) return null
  return (
    <div
      className="flex items-center justify-center fixed inset-0 bg-black/50"
      onClick={onClose}
    >
      <div
        className="flex bg-white rounded-lg shadow-xl p-4 md:p-6 w-96 max-w-md relative"
        onClick={event => event.stopPropagation()} // here: evita que al hacer click en el formulario se cierre
      >
        <button
          className="absolute top-4 right-4 cursor-pointer hover:bg-red-300 
                    rounded border px-2 transition-colors text-xl z-10"
          onClick={onClose}
        >
          <CancelIcon className="w-6 h-8" />
        </button>
        {children}
      </div>
    </div>
  )
}
