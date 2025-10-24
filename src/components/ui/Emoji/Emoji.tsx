
interface EmojiProps {
    name: 'travel' | 'gym' | 'toDo',
    className?: string
}
export const Emoji = ({name, className = '' }: EmojiProps) => {
    const emojis = {
        travel: '🌎',
        gym : '🏋',
        toDo: '📚'
    }
    return (
        <span className={className}>{emojis[name]}</span>    
    )
}