import { useState } from "react"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { Dialog } from "./components/ui/Dialog"
import { TaskListForm } from "./components/ui/Form"
import type { TaskListData } from "./components/ui/Form/TaskListForm"
import { useLocalStorage } from "./hooks/useLocalStorage"

function Board() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [taskLists, setTaskList] = useLocalStorage<TaskListData[]>('my-task-lists', [])
  
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const handleAddList = (newList: TaskListData) => {
    setTaskList([...taskLists, newList])
    closeDialog()
  }

  return (
    <>
      <h1 className="text-4xl font-thin text-center mt-20">
        Board
      </h1>
      <div className="relative px-4 mt-8">
          <Button 
            onClick={openDialog}
            className="absolute top-0 right-4 md:right-96"
          >
            Add list
          </Button>
        <div className="pt-16">
        {
          taskLists.map((list: TaskListData) => (
            <Card title={list.title} icon={list.icon} key={list.id} />
          ))
        }
        </div>
      </div>
      <Dialog visible={isDialogOpen} onClose={closeDialog} >
        <TaskListForm onSubmit={handleAddList} />
      </Dialog>
    </>
  )
}

export default Board
