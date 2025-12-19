import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  toggleTask: (taskId: string, listId: string) => void
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

  const toggleTaskCompletion = (taskId: string, tasks: Task[]) => {
    return tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  }

  const toggleTask = (taskId: string, listId: string) => {
    setLists((prevLists: TaskListData[]) =>
      prevLists.map(list => {
        if (list.id !== listId) return list

        return {
          ...list,
          tasks: toggleTaskCompletion(taskId, list.tasks),
        }
      })
    )
  }

  const value = { lists, addList, toggleTask }

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const context = useContext(CardsContext)

  if (context === undefined)
    throw new Error('useCards must be used within CardsProvider')
  return context
}
