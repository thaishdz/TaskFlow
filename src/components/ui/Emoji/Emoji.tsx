
interface EmojiProps {
    name: 'travel' | 'chores' | 'personal',
    className?: string
}
export const Emoji = ({name, className = '' }: EmojiProps) => {
    const emojis = {
        travel: '🌎',
        chores : '🏠',
        personal: '🎯'
    }
    return (
        <span className={className}>{emojis[name]}</span>    
    )
}