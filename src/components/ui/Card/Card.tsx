import { useState } from 'react'
import type { Task } from '../Form/TaskListForm'
import { Button } from '../Button'
import { useCards } from '../../../context/CardsProvider'
import clsx from 'clsx'

interface CardProps {
  tasks: Task[]
  listId: string
}
interface DraftTask {
  id: string
  name: string
  isNew: boolean
}
export const Card = ({ tasks, listId }: CardProps) => {
  const { addTask, updateTask, removeTask, removeList } = useCards()
  const [isDraftMode, setIsDraftMode] = useState(false)
  const [drafts, setDrafts] = useState<DraftTask[]>([])

  const enterDraftMode = () => {
    // creating temporal values from tasks
    const existingDrafts = tasks.map(task => ({
      id: task.id,
      name: task.name,
      isNew: false,
    }))
    setDrafts(existingDrafts)
    setIsDraftMode(prev => !prev) // Cambio al modo edición
  }

  const handleAddTaskInput = () => {
    setDrafts(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: '', isNew: true },
    ])
  }

  const handleDraftChange = (id: string, newName: string) => {
    setDrafts(prev =>
      prev.map(draft => (draft.id === id ? { ...draft, name: newName } : draft))
    )
  }

  const handleSave = () => {
    drafts.forEach(draft => {
      if (draft.isNew && draft.name.trim()) {
        addTask(listId, { id: draft.id, name: draft.name, completed: false })
      } else {
        const originalTask = tasks.find(task => task.id === draft.id)
        if (originalTask && draft.name !== originalTask.name) {
          updateTask(originalTask.id, listId, { name: draft.name })
        }
      }
    })
    setDrafts([])
    setIsDraftMode(false)
  }

  const handleCancel = () => {
    setDrafts([])
    setIsDraftMode(false)
  }

  return (
    <>
      {isDraftMode ? (
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg">
          <div className="flex">
            <Button
              variant="add"
              onClick={handleAddTaskInput}
              className="flex gap-2"
            >
              add task
            </Button>
            <Button
              variant="test"
              className="flex items-center ml-auto"
              onClick={() => removeList(listId)}
            >
              remove list
            </Button>
          </div>
          {drafts.map(draft => (
            <div
              key={draft.id}
              className="mt-2 rounded-xl bg-white p-4 shadow-lg"
            >
              <input
                type="text"
                value={draft.name}
                onChange={e => handleDraftChange(draft.id, e.target.value)}
                placeholder="new task"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-4 mt-4 mx-2 sm:mx-6">
            <Button variant="save" onClick={handleSave} />
            <Button variant="cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        // Read mode
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg border">
          <div className="flex">
            <Button
              variant="edit"
              onClick={enterDraftMode}
              className="ml-auto"
            />
          </div>
          <ul>
            {tasks.length === 0 ? (
              <span>
                <i>No tasks</i>
              </span>
            ) : (
              tasks.map(task => (
                <li
                  className={clsx(
                    'text-gray-800 cursor-pointer',
                    task.completed &&
                      'italic line-through text-gray-400 opacity-60'
                  )}
                  key={task.id}
                  onClick={() =>
                    updateTask(task.id, listId, {
                      completed: !task.completed,
                    })
                  }
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
