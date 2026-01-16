import { useState } from 'react'
import type { Task } from '../Form/TaskListForm'
import { Button } from '../Button'
import { useCards } from '../../../context/CardsProvider'
import clsx from 'clsx'

interface CardProps {
  tasks: Task[]
  listId: string
}
export const Card = ({ tasks, listId }: CardProps) => {
  const { addTask, updateTask } = useCards()
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [draftTaskNames, setDraftTaskNames] = useState<Record<string, string>>(
    {}
  )
  const [newTaskName, setNewTaskName] = useState<string>('')

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
    if (tasks.length > 0) {
      tasks.map(originalTask => {
        const editedName = draftTaskNames[originalTask.id]
        if (editedName && editedName !== originalTask.name) {
          updateTask(originalTask.id, listId, {
            name: editedName,
          })
        }
      })
    }

    // Si existe una nueva tarea, añádela al listado
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        name: newTaskName,
        completed: false,
      }
      addTask(listId, newTask)
      setNewTaskName('') // clear input
    }
    setIsInEditMode(false)
  }

  const handleCancel = () => {
    setDraftTaskNames({}) // descarta cambios y limpia el estado
    setIsInEditMode(false)
  }

  return (
    <>
      {isInEditMode ? (
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg">
          {tasks.length === 0 ? (
            <input
              type="text"
              value={newTaskName}
              onChange={e => setNewTaskName(e.target.value)}
              placeholder="new task"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          ) : (
            <>
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="mt-2 rounded-xl bg-white p-4 shadow-lg"
                >
                  <input
                    type="text"
                    value={draftTaskNames[task.id]}
                    onChange={e => handleTaskValues(task.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="mt-2 rounded-xl bg-white p-4 shadow-lg">
                <input
                  type="text"
                  value={newTaskName}
                  onChange={e => setNewTaskName(e.target.value)}
                  placeholder="new task"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4 mx-2 sm:mx-6">
            <Button variant="save" onClick={handleSave} />
            <Button variant="cancel" onClick={handleCancel} />
          </div>
        </div>
      ) : (
        // Read mode
        <div className="mt-2 rounded-xl bg-white p-4 shadow-lg border">
          <Button variant="edit" onClick={handleEditMode} />
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
