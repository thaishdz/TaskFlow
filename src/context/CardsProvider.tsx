import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  removeList: (listId: string) => void
  setTasks: (listId: string, newTasks: Task[]) => void
}

interface CardsProviderProps {
  children: React.ReactNode
}

const CardsContext = createContext<CardsContextValue | undefined>(undefined)

export const CardsProvider = ({ children }: CardsProviderProps) => {
  const ONBOARDING_LIST: TaskListData[] = [
    {
      id: 'example-1',
      title: 'My Tasks',
      icon: 'personal',
      tasks: [
        { id: 'task-1', name: 'Click to complete a task', isCompleted: false },
        {
          id: 'task-2',
          name: 'Edit mode ✏️ to manage your tasks',
          isCompleted: false,
        },
      ],
    },
  ]
  const [lists, setLists] = useLocalStorage<TaskListData[]>(
    'my-task-lists',
    ONBOARDING_LIST
  )

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
    addList,
    removeList,
    setTasks,
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
