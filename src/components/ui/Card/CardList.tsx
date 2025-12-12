import { useState } from 'react'
import type { TaskListData } from '../Form/TaskListForm'
import { Card } from './Card'

interface CardListProps {
  lists: TaskListData[]
  onToggleItem: (taskId: string, listId: string) => void
}

export const CardList = ({ lists, onToggleItem }: CardListProps) => {
  // guarda el ID de la card expandida actualmente
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggleCard = (id: string) =>
    setExpandedId(expandedId === id ? null : id)

  return (
    <div>
      {lists.map(list => (
        <Card
          key={list.id}
          id={list.id}
          title={list.title}
          icon={list.icon}
          tasks={list.tasks}
          isExpanded={expandedId === list.id}
          onToggleCard={() => handleToggleCard(list.id)}
          onToggleItem={taskId => onToggleItem(taskId, list.id)}
        />
      ))}
    </div>
  )
}
