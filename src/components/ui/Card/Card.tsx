import { Emoji, type EmojiName } from '../Emoji'
import type { Task } from '../Form/TaskListForm'

interface CardProps {
  id: string
  title: string
  icon: EmojiName
  tasks: Task[]
  isExpanded: boolean
  onToggleCard: () => void
  onToggleItem: (taskId: string) => void
}

export const Card = ({
  title,
  icon,
  tasks,
  isExpanded,
  onToggleCard,
  onToggleItem,
}: CardProps) => {
  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-yellow-200 m-6 p-4 shadow-lg md:w-1/2">
      <button
        type="button"
        onClick={onToggleCard}
        className="flex w-full items-center justify-between cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center">
          <div className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-xl p-6 shadow-lg">
            <Emoji name={icon} className="text-xl sm:text-2xl" />
          </div>
          <h2 className="text-base sm:text-xl font-bold truncate">{title}</h2>
        </div>
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isExpanded && (
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg">
          <ul>
            {tasks.length === 0 ? (
              <span>
                <i>No tasks</i>
              </span>
            ) : (
              tasks.map(task => (
                <li
                  className={`text-gray-800 cursor-pointer ${task.completed ? 'italic line-through text-gray-400 opacity-60' : ''}`}
                  key={task.id}
                  onClick={() => onToggleItem(task.id)}
                >
                  {task.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
