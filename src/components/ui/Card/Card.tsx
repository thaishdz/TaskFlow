import { useState } from 'react'
import type { Task } from '../Form/TaskListForm'
import { Button } from '../Button'
import { useCards } from '../../../context/CardsProvider'
import clsx from 'clsx'

interface CardProps {
  tasks: Task[]
  listId: string
  isDraftMode: boolean
  onEnterDraft: () => void
  onSave: () => void
  onCancel: () => void
}
/* 
  Cada componente maneja su propio "draft" y se sincronizan a través de los callbacks 
  - Card maneja los de las tasks
  - CardList solo el del titulo de la lista
  Cada uno inicializa/limpia su propio estado, sincronizados por los callbacks. 
*/
export const Card = ({
  tasks,
  listId,
  isDraftMode,
  onEnterDraft,
  onSave,
  onCancel,
}: CardProps) => {
  const { setTasks, removeList } = useCards()
  const [drafts, setDrafts] = useState<Task[]>([])
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [targetId, setTargetId] = useState<string | null>(null)

  const enterDraftMode = () => {
    // creating temporal values from tasks
    const existingDrafts = tasks.map(task => ({
      id: task.id,
      name: task.name,
      isCompleted: task.isCompleted,
    }))
    setDrafts(existingDrafts)
    onEnterDraft() // Avisa al padre para que active modo edición y copie el título
  }

  const handleAddTaskInput = () => {
    setDrafts(prev => [
      ...prev,
      { id: crypto.randomUUID(), name: '', isCompleted: false },
    ])
  }

  const handleDraftChange = (id: string, newName: string) => {
    setDrafts(prev =>
      prev.map(draft => (draft.id === id ? { ...draft, name: newName } : draft))
    )
  }

  const handleSave = () => {
    const newTasks: Task[] = drafts
      .filter(draft => draft.name.trim())
      .map(draft => ({
        id: draft.id,
        name: draft.name,
        isCompleted: draft.isCompleted,
      }))

    setTasks(listId, newTasks)
    setDrafts([])
    onSave() // Avisa al padre para que guarde el título y salga del modo edición
  }

  const handleRemoveDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId))
  }

  const handleCancel = () => {
    setDrafts([])
    onCancel()
  }

  // feat: Drag & Drop using Pointer Events

  const handlePointerDown = (draggedId: string) => {
    setDraggedId(draggedId)
  }

  const handlePointerMove = (
    e: React.PointerEvent,
    draggedId: string | null
  ) => {
    if (!draggedId && targetId) {
      setDraggedId(draggedId)
    }
    // Solo procesamos si hay algo siendo arrastrado
    if (!draggedId) return

    // 1. Detectar qué elemento está bajo el cursor/dedo
    const node = document.elementFromPoint(e.clientX, e.clientY)

    if (node) {
      // 2. Buscar el contenedor draft más cercano
      const draftElement = node.closest('[data-draft-id]') ?? ''

      if (draftElement) {
        // 3. Extraer el ID del elemento encontrado
        const hoveredId = draftElement.getAttribute('data-draft-id')

        // 4. Solo actualizar si es diferente (evita re-renders innecesarios)
        if (hoveredId && hoveredId !== draggedId && hoveredId !== targetId) {
          setTargetId(hoveredId)
        }
      }
    }
  }

  const handlePointerUp = () => {
    if (!(draggedId && targetId)) {
      setDraggedId(null)
      setTargetId(null)
      return
    }

    // Crear copia para inmutabilidad (React way)
    const reordered = [...drafts]

    // 2. Encontrar los índices
    const fromIndex = reordered.findIndex(item => item.id === draggedId)
    const toIndex = reordered.findIndex(item => item.id === targetId)

    // 3. Reordenar
    const [movedDraft] = reordered.splice(fromIndex, 1) // 1. queremos quitarlo de donde está
    // 2. ajustar índice después de splice: vecinos inmediatos van directo, separados restan 1, hacia atrás sin cambio
    const finalIndex =
      fromIndex < toIndex
        ? toIndex - fromIndex === 1
          ? toIndex
          : toIndex - 1
        : toIndex
    reordered.splice(finalIndex, 0, movedDraft) // 3. insertar en nueva posición

    // 4. actualiza estado
    setDrafts(reordered)

    // 5. Cleanup
    setDraggedId(null)
    setTargetId(null)
  }

  return (
    <>
      {isDraftMode ? (
        <div
          onPointerMove={e => handlePointerMove(e, draggedId)}
          onPointerUp={handlePointerUp}
          className={clsx(
            'mt-2 rounded-xl bg-white p-4 shadow-lg',
            draggedId && '[&_*]:cursor-grabbing cursor-grabbing'
          )}
        >
          <div className="flex">
            <Button
              variant="add"
              onClick={handleAddTaskInput}
              className="flex gap-2"
            >
              add task
            </Button>
            <Button
              variant="link"
              className="flex items-center ml-auto hover:underline"
              onClick={() => removeList(listId)}
            >
              remove list
            </Button>
          </div>
          {drafts.map(draft => (
            <div
              key={draft.id}
              data-draft-id={draft.id}
              className={clsx(
                'flex items-center gap-2 mt-2 rounded-xl bg-white p-4 shadow-lg touch-none transition-all duration-150',
                draft.id === draggedId &&
                  'opacity-50 scale-105 shadow-2xl ring-2 ring-orange-400 z-10',
                draft.id === targetId &&
                  'border-dashed border-2 border-orange-500 bg-orange-50'
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
                variant="destructive"
                className="!px-2"
                onClick={() => handleRemoveDraft(draft.id)}
              />
              <Button
                variant="draggable"
                onPointerDown={() => handlePointerDown(draft.id)}
              />
            </div>
          ))}
          <div className="flex sm:flex-row justify-around mt-4 mx-2 sm:mx-6">
            <Button variant="success" onClick={handleSave} />
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
                    task.isCompleted &&
                      'italic line-through text-gray-400 opacity-60'
                  )}
                  key={task.id}
                  onClick={() =>
                    setTasks(
                      listId,
                      tasks.map(t =>
                        t.id === task.id
                          ? { ...t, isCompleted: !t.isCompleted }
                          : t
                      )
                    )
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
