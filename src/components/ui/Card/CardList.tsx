import { useState } from 'react'
import type { TaskListData } from '../Form/TaskListForm'
import { Card } from './Card'

interface CardListProps {
  taskLists: TaskListData[]
}

export const CardList = ({ taskLists }: CardListProps) => {
  // guarda el ID de la card expandida actualmente
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) =>
    setExpandedId(expandedId === id ? null : id)

  return (
    <div>
      {taskLists.map(taskList => (
        <Card
          key={taskList.id}
          id={taskList.id}
          title={taskList.title}
          icon={taskList.icon}
          tasks={taskList.tasks}
          isExpanded={expandedId === taskList.id}
          onToggle={() => handleToggle(taskList.id)}
        />
      ))}
    </div>
  )
}
