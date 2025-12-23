import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

type UpdateTaskPayload = Partial<Omit<Task, 'id'>>

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  updateTask: (
    taskId: string,
    listId: string,
    payload: UpdateTaskPayload
  ) => void
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

  const updateTask = (
    taskId: string,
    listId: string,
    payload: UpdateTaskPayload
  ) => {
    const currentList = [...lists]
    const newList = currentList.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: list.tasks.map(task => ({
            ...task,
            ...(task.id === taskId ? payload : task),
          })),
        }
      }

      return list
    })
    setLists(newList)
  }

  const value = { lists, addList, updateTask }

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const context = useContext(CardsContext)

  if (context === undefined)
    throw new Error('useCards must be used within CardsProvider')
  return context
}
