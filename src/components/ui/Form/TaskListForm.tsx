import { useState } from 'react'
import { type EmojiName, Emoji } from '../Emoji'
import { Button } from '../Button'
import { useForm } from 'react-hook-form'

export interface Task {
  id: string
  name: string
}

export interface TaskListData {
  id: string
  title: string
  icon: EmojiName
  tasks: Task[]
}

interface TaskListFormProps {
  onSubmit: (data: TaskListData) => void
}

export const TaskListForm = ({ onSubmit }: TaskListFormProps) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskNameInput, setNewTaskNameInput] = useState<string>('')

  const { register, setValue, watch } = useForm<TaskListData>({
    defaultValues: { title: '' },
  })

  const handleAddTask = () => {
    if (!newTaskNameInput.trim()) return

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        name: newTaskNameInput,
      },
    ])

    setNewTaskNameInput('')
  }

  const selectedIcon = watch('icon')

  const handleCreateListCTA = () => {
    const title = watch('title')

    if (!title || !selectedIcon) {
      alert('List should have a title and an icon')
      return
    }

    // se lo empaqueto al padre para mostrarlos, guardarlos,... (callback props)
    onSubmit({
      id: crypto.randomUUID(),
      title: title,
      icon: selectedIcon,
      tasks: tasks,
    })
  }

  const emojiOptions: EmojiName[] = ['travel', 'chores', 'personal']

  return (
    <form className="flex flex-col gap-6 w-full">
      <h2 className="text-xl text-bold">Add list</h2>
      <label className="text-sm font-medium text-gray-500" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        {...register('title')} // encapsula name, onchange, onblur, ref ...
        placeholder="e.g., My Awesome List"
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                    placeholder:text-gray-400
                "
      />

      <label className="text-sm font-medium text-gray-500" htmlFor="icon">
        Icon
      </label>
      <div className="flex gap-2">
        {emojiOptions.map(name => (
          <button
            type="button"
            key={name}
            onClick={() => setValue('icon', name)}
            className={`bg-gray-200 p-4 px-5 rounded-xl cursor-pointer shadow-lg
                                ${
                                  selectedIcon === name
                                    ? 'bg-yellow-500'
                                    : 'hover:bg-yellow-500'
                                }
                            `}
          >
            <div className="scale-150">
              <Emoji name={name} />
            </div>
          </button>
        ))}
      </div>
      <label className="text-sm font-medium text-gray-500" htmlFor="tasks">
        Tasks
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id="task"
          value={newTaskNameInput}
          placeholder="e.g., Play Expedition 33"
          onChange={e => setNewTaskNameInput(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                        placeholder:text-gray-400
                    "
        />
        <Button type="add" onClick={handleAddTask} />
      </div>
      {tasks.length > 0 && (
        <ul className="flex flex-col ml-1">
          {tasks.map(task => (
            <i>
              <li key={task.id} className="text-gray-700">
                {task.name}
              </li>
            </i>
          ))}
        </ul>
      )}
      <Button type="add" onClick={handleCreateListCTA}>
        Create List
      </Button>
    </form>
  )
}
