export type EmojiName = 'travel' | 'chores' | 'personal'

interface EmojiProps {
  name: EmojiName
  className?: string
}
export const Emoji = ({ name, className = '' }: EmojiProps) => {
  const emojis: Record<EmojiName, string> = {
    travel: '🌎',
    chores: '🏠',
    personal: '🎯',
  }
  return <span className={className}>{emojis[name]}</span>
}
