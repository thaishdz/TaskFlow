import AirplaneIcon from '@/assets/icons/airplane.svg?react'
import HouseIcon from '@/assets/icons/house.svg?react'
import GoalIcon from '@/assets/icons/goal.svg?react'
import MarketIcon from '@/assets/icons/market.svg?react'

export type IconName = 'travel' | 'chores' | 'personal' | 'market'

interface IconProps {
  name: IconName
  className?: string
}
export const Icon = ({ name, className = '' }: IconProps) => {
  const icons: Record<IconName, React.ReactNode> = {
    travel: <AirplaneIcon className="w-5 h-5" />,
    chores: <HouseIcon className="w-5 h-5 " />,
    personal: <GoalIcon className="w-5 h-5" />,
    market: <MarketIcon className="w-5 h-5" />,
  }
  return <span className={className}>{icons[name]}</span>
}
