import { useState } from 'react'
import type { Task } from '../Form/TaskListForm'
import { Button } from '../Button'
import { useCards } from '../../../context/CardsProvider'

interface CardProps {
  tasks: Task[]
  listId: string
  onToggleItem: (taskId: string) => void
}
export const Card = ({ tasks, listId, onToggleItem }: CardProps) => {
  const { editTask } = useCards()
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [draftTaskNames, setDraftTaskNames] = useState<Record<string, string>>(
    {}
  )

  const handleEditMode = () => {
    if (!isInEditMode) {
      // Voy a ENTRAR en modo edición
      const currentValues: Record<string, string> = {}
      tasks.map(task => {
        currentValues[task.id] = task.name // guardo valores actuales
      })
      setDraftTaskNames(currentValues)
    }
    // Cambio al modo edición
    setIsInEditMode(!isInEditMode)
  }

  const handleTaskValues = (taskId: string, newName: string) => {
    setDraftTaskNames(prevValue => ({
      ...prevValue,
      [taskId]: newName,
    }))
  }

  const handleSave = () => {
    tasks.map(originalTask => {
      const editedName = draftTaskNames[originalTask.id]
      if (editedName && editedName !== originalTask.name) {
        editTask(originalTask.id, listId, editedName)
        setIsInEditMode(false)
      }
    })
  }

  const handleCancel = () => {
    setDraftTaskNames({}) // descarta cambios y limpia el estado
    setIsInEditMode(false)
  }

  return (
    <>
      {isInEditMode ? (
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg">
          {tasks.map(task => (
            <div
              key={task.id}
              className="mt-2 rounded-xl bg-white p-4 shadow-lg"
            >
              <input
                type="text"
                value={draftTaskNames[task.id] || task.name}
                onChange={e => handleTaskValues(task.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4 mx-2 sm:mx-6">
            <Button type="save" onClick={handleSave} />
            <Button type="cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        // Read mode
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg border">
          <Button type="edit" onClick={handleEditMode} />
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
    </>
  )
}
