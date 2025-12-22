import { createContext, useContext } from 'react'
import type { Task, TaskListData } from '../components/ui/Form/TaskListForm'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CardsContextValue {
  lists: TaskListData[]
  addList: (newList: TaskListData) => void
  toggleTask: (taskId: string, listId: string) => void
  editTask: (taskId: string, listId: string, newTitle: string) => void
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

  const updateTaskHelper = (
    taskId: string,
    listId: string,
    transformer: (task: Task) => Task
  ) => {
    setLists((prevLists: TaskListData[]) =>
      prevLists.map(list => {
        if (list.id !== listId) return list
        return {
          ...list,
          tasks: list.tasks.map(task =>
            task.id === taskId ? transformer(task) : task
          ),
        }
      })
    )
  }

  const toggleTask = (taskId: string, listId: string) => {
    updateTaskHelper(taskId, listId, task => ({
      ...task,
      completed: !task.completed,
    }))
  }

  const editTask = (taskId: string, listId: string, newTitle: string) => {
    updateTaskHelper(taskId, listId, task => ({
      ...task,
      name: newTitle.trim(),
    }))
  }

  const value = { lists, addList, toggleTask, editTask }

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const context = useContext(CardsContext)

  if (context === undefined)
    throw new Error('useCards must be used within CardsProvider')
  return context
}
