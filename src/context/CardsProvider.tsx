import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  editList: (listId: string, newTitle: string) => void
  removeList: (listId: string) => void
  setTasks: (listId: string, newTasks: Task[]) => void
}

interface CardsProviderProps {
  children: React.ReactNode
}

const CardsContext = createContext<CardsContextValue | undefined>(undefined)

const ONBOARDING_LIST: TaskListData[] = [
  {
    id: 'onboarding-id',
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

export const CardsProvider = ({ children }: CardsProviderProps) => {
  const [showOnboarding, setShowOnboarding] = useLocalStorage(
    'show-onboarding',
    true
  )
  const [lists, setLists] = useLocalStorage<TaskListData[]>(
    'my-task-lists',
    showOnboarding ? ONBOARDING_LIST : []
  )

  const addList = (newList: TaskListData) => {
    setLists([...lists, newList])
  }

  const setTasks = (listId: string, newTasks: Task[]) => {
    setLists(
      (
        prevLists // ← prevLists en vez de lists
      ) =>
        prevLists.map(list =>
          list.id === listId ? { ...list, tasks: newTasks } : list
        )
    )
  }

  const editList = (listId: string, newTitle: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    )
  }

  const removeList = (listId: string) => {
    setLists(prevLists => prevLists.filter(list => listId !== list.id))
    if (listId === 'onboarding-id') setShowOnboarding(false)
  }

  const value = {
    lists,
    addList,
    editList,
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
