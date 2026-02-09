import { useEffect, useState } from 'react'
import { type IconName, Icon } from '../Icon'
import { Button } from '../Button'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

export interface Task {
  id: string
  name: string
  isCompleted: boolean
}

export interface TaskListData {
  id: string
  title: string
  icon: IconName
  tasks: Task[]
}

interface TaskListFormProps {
  onSubmit: (data: TaskListData) => void
}

export const TaskListForm = ({ onSubmit }: TaskListFormProps) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskNameInput, setNewTaskNameInput] = useState<string>('')

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskListData>({
    defaultValues: { title: '' },
    mode: 'onChange',
  })

  useEffect(() => {
    register('icon', { required: 'Please select an icon' })
  }, [register])

  const handleAddTask = () => {
    if (!newTaskNameInput.trim()) return

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        name: newTaskNameInput,
        isCompleted: false,
      },
    ])

    setNewTaskNameInput('')
  }

  const selectedIcon = watch('icon')
  // TODO: Avoid this
  const iconOptions: IconName[] = ['travel', 'chores', 'personal', 'market']

  const onSubmitForm = handleSubmit(data => {
    // se lo empaqueto al padre para mostrarlos, guardarlos,... (callback props)
    onSubmit({
      id: crypto.randomUUID(),
      title: data.title,
      icon: data.icon,
      tasks: tasks,
    })
  })

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(prevTask => taskId !== prevTask.id))
  }

  return (
    <form className="flex flex-col gap-6 w-full">
      <h2 className="text-xl text-bold">Add list</h2>
      <label className="text-sm font-medium text-gray-500" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        {...register(
          'title', // encapsula name, onchange, onblur, ref ...
          {
            required: 'Title is required',
            maxLength: {
              value: 25,
              message: 'Title cannot exceed 25 characters',
            },
          }
        )}
        placeholder="e.g., My Awesome List"
        className={clsx(
          'w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400',
          errors.title
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
        )}
      />

      {errors.title && (
        <p className="text-red-500 text-sm -mt-4">{errors.title.message}</p>
      )}

      <label className="text-sm font-medium text-gray-500" htmlFor="icon">
        Icon
      </label>
      <div className="flex gap-2">
        {iconOptions.map(name => (
          <button
            type="button"
            key={name}
            onClick={() => setValue('icon', name)}
            className={clsx(
              'bg-gray-200 p-4 px-5 rounded-xl cursor-pointer shadow-lg',
              selectedIcon === name ? 'bg-yellow-500' : 'hover:bg-yellow-500'
            )}
          >
            <div className="scale-150">
              <Icon name={name} />
            </div>
          </button>
        ))}
      </div>
      {errors.icon && (
        <p className="text-red-500 text-sm -mt-4">{errors.icon.message}</p>
      )}
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
        <Button variant="add" onClick={handleAddTask} />
      </div>
      {tasks.length > 0 && (
        <ul className="flex flex-col gap-4 ml-1 mt-5">
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between text-gray-700">
              <i>{task.name}</i>
              <Button
                variant="destructive"
                className="!px-3 !py-0 ml-2"
                onClick={() => removeTask(task.id)}
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        className="py-4"
        variant="add"
        showIcon={false}
        onClick={onSubmitForm}
      >
        Create List
      </Button>
    </form>
  )
}
