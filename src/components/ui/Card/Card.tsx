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
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

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

  const handleRemoveDraft = (draft: DraftTask) => {
    if (!draft.isNew) removeTask(draft.id, listId)
    setDrafts(prev => prev.filter(d => d.id !== draft.id))
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

  // feat: Drag & Drop using HTML5 API
  const handleDragStart = (e: React.DragEvent, draftId: string) => {
    e.dataTransfer.setData('text/plain', draftId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // "Sí, permitir drop aquí"
  }

  const handleDragEnter = (draftId: string) => {
    setDropTargetId(draftId) // cambia el border al nuevo draft
  }

  const handleDragEnd = () => {
    setDropTargetId(null) // limpia al terminar
  }

  const handleDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault() // SIN ESTO NO FUNCIONA EL DROP

    // Crear copia para inmutabilidad (React way)
    const reordered = [...drafts]

    // 1. Recuperar qué draft estabas arrastrando
    const draggedId = e.dataTransfer.getData('text/plain')

    // 2. Encontrar los índices
    const fromIndex = reordered.findIndex(item => item.id === draggedId)
    const toIndex = reordered.findIndex(item => item.id === dropTargetId)

    // 3. Reordenar
    const [movedDraft] = reordered.splice(fromIndex, 1) // 1. queremos quitarlo de donde está
    const finalIndex = fromIndex < toIndex ? toIndex : toIndex + 1 // 2. desplazar el item hacia adelante
    reordered.splice(finalIndex, 0, movedDraft) // 3. insertar en nueva posición

    // 4. actualiza estado
    setDrafts(reordered)

    // 5. Cleanup
    setDropTargetId(null)
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
              draggable="true"
              onDragStart={e => handleDragStart(e, draft.id)}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(draft.id)}
              onDragEnd={handleDragEnd}
              onDrop={e => handleDrop(e, draft.id)}
              className={clsx(
                'flex items-center gap-2 mt-2 rounded-xl bg-white p-4 shadow-lg',
                draft.id === dropTargetId &&
                  'border-dashed border-2 border-gray-500'
              )}
            >
              <input
                type="text"
                value={draft.name}
                onChange={e => handleDraftChange(draft.id, e.target.value)}
                placeholder="new task"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <Button
                variant="remove"
                className="!px-2"
                onClick={() => handleRemoveDraft(draft)}
              />
            </div>
          ))}
          <div className="flex sm:flex-row justify-around gap-2 sm:gap-4 mt-4 mx-2 sm:mx-6">
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
                <i className="text-xl">No tasks</i>
              </span>
            ) : (
              tasks.map(task => (
                <li
                  className={clsx(
                    'text-gray-800 cursor-pointer text-xl',
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
