import { useState } from 'react'
import type { Task } from '../Form/TaskListForm'
import { Button } from '../Button'

interface CardItemProps {
  tasks: Task[]
  onToggleItem: (taskId: string) => void
}
export const CardItem = ({ tasks, onToggleItem }: CardItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  //const [textEdit, setIsTextEdit] = useState('')
  const handleEditMode = () => setIsEditing(!isEditing)

  return (
    <>
      {isEditing ? (
        tasks.map(task => (
          <div
            key={task.id}
            className="mt-2 rounded-xl bg-white p-4 shadow-lg border"
          >
            <input type="text" value={task.name} />
          </div>
        ))
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
