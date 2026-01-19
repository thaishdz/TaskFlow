import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

type UpdateTaskPayload = Partial<Omit<Task, 'id'>>

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  removeList: (listId: string) => void
  addTask: (listId: string, newTask: Task) => void
  updateTask: (
    taskId: string,
    listId: string,
    payload: UpdateTaskPayload
  ) => void
  removeTask: (taskId: string, listId: string) => void
}

interface CardsProviderProps {
  children: React.ReactNode
}

const CardsContext = createContext<CardsContextValue | undefined>(undefined)

export const CardsProvider = ({ children }: CardsProviderProps) => {
  const [lists, setLists] = useLocalStorage<TaskListData[]>('my-task-lists', [])

  const addList = (newList: TaskListData) => {
    setLists([...lists, newList])
  }

  const addTask = (listId: string, newTask: Task) => {
    const updatedLists = lists.map(list => {
      if (list.id !== listId) return list
      return {
        ...list,
        tasks: [...list.tasks, newTask],
      }
    })
    setLists(updatedLists)
  }

  const removeList = (listId: string) => {
    const updatedLists = lists.filter(list => listId !== list.id)
    setLists(updatedLists)
  }

  const updateTask = (
    taskId: string,
    listId: string,
    payload: UpdateTaskPayload
  ) => {
    const updatedLists = lists.map(list => {
      if (list.id !== listId) return list
      return {
        ...list,
        tasks: list.tasks.map(task => {
          if (task.id !== taskId) return task
          return { ...task, ...payload }
        }),
      }
    })
    setLists(updatedLists)
  }

  const removeTask = (taskId: string, listId: string) => {
    const updatedLists = lists.map(list => {
      if (list.id !== listId) return list
      return {
        ...list,
        tasks: list.tasks.filter(task => task.id !== taskId),
      }
    })
    setLists(updatedLists)
  }

  const value = { lists, addList, removeList, addTask, updateTask, removeTask }

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const context = useContext(CardsContext)

  if (context === undefined)
    throw new Error('useCards must be used within CardsProvider')
  return context
}
