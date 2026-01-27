import { useState } from 'react'
import { Icon } from '../Icon'
import { Card } from './Card'
import { useCards } from '../../../context/CardsProvider'
import type { TaskListData } from '../Form/TaskListForm'

export const CardList = () => {
  const { lists, editList } = useCards()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [draftModeId, setDraftModeId] = useState<string | null>(null)
  const [draftTitle, setDraftTitle] = useState('')
  const handleToggleCard = (id: string) => {
    if (draftModeId === id) return // No cerrar si está editando
    setExpandedId(expandedId === id ? null : id)
  }

  const onEnterDraft = (list: TaskListData) => {
    setDraftModeId(list.id)
    setDraftTitle(list.title)
  }

  const onSave = (listId: string, newTitle: string) => {
    editList(listId, newTitle)
    setDraftModeId(null)
  }

  const onCancel = () => setDraftModeId(null)

  return (
    <div>
      {lists.map(list => {
        const isExpanded = expandedId === list.id
        return (
          <div
            key={list.id}
            className="w-full max-w-xl mx-auto rounded-xl bg-slate-50 hover:bg-slate-100 m-6 p-4 shadow-lg md:w-1/2"
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
                {draftModeId === list.id ? (
                  <input
                    autoFocus
                    type="text"
                    maxLength={50}
                    value={draftTitle}
                    onChange={e => setDraftTitle(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    onKeyDown={e => e.stopPropagation()}
                    className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                ) : (
                  <h2 className="text-base sm:text-xl font-bold truncate">
                    {list.title}
                  </h2>
                )}
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
              <Card
                tasks={list.tasks}
                listId={list.id}
                isDraftMode={draftModeId === list.id}
                onEnterDraft={() => onEnterDraft(list)}
                onSave={() => onSave(list.id, draftTitle)}
                onCancel={onCancel}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
