import { useState } from 'react'
import { Icon } from '../Icon'
import { Card } from './Card'
import { useCards } from '../../../context/CardsProvider'

export const CardList = () => {
  const { lists } = useCards()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const handleToggleCard = (id: string) =>
    setExpandedId(expandedId === id ? null : id)

  return (
    <div>
      {lists.map(list => {
        const isExpanded = expandedId === list.id
        return (
          <div
            key={list.id}
            className="w-full max-w-xl mx-auto rounded-xl bg-yellow-200 m-6 p-4 shadow-lg md:w-1/2"
          >
            <button
              type="button"
              onClick={() => handleToggleCard(list.id)}
              className="flex w-full items-center justify-between cursor-pointer"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center">
                <div className="flex justify-center items-center w-10 h-10 mr-4 bg-gray-50 rounded-xl p-6 shadow-lg">
                  <Icon name={list.icon} className="text-xl sm:text-2xl" />
                </div>
                <h2 className="text-base sm:text-xl font-bold truncate">
                  {list.title}
                </h2>
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
            {isExpanded && <Card tasks={list.tasks} listId={list.id} />}
          </div>
        )
      })}
    </div>
  )
}
