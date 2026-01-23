import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CardsContextValue {
  lists: TaskListData[]
  setTasks: (listId: string, newTasks: Task[]) => void
  addList: (newList: TaskListData) => void
  removeList: (listId: string) => void
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
  const setTasks = (listId: string, newTasks: Task[]) => {
    setLists(
      lists.map(list =>
        list.id === listId ? { ...list, tasks: newTasks } : list
      )
    )
  }

  const removeList = (listId: string) => {
    const updatedLists = lists.filter(list => listId !== list.id)
    setLists(updatedLists)
  }

  const value = {
    lists,
    setTasks,
    addList,
    removeList,
  }

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const context = useContext(CardsContext)

  if (context === undefined)
    throw new Error('useCards must be used within CardsProvider')
  return context
}
