import { useState } from "react"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { Dialog } from "./components/ui/Dialog"
import { TaskListForm } from "./components/ui/Form"
import type { TaskListData } from "./components/ui/Form/TaskListForm"

function Board() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [taskLists, setTaskList] = useState<TaskListData[]>([])
  
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
          taskLists.map((list, index) => (
            <Card title={list.title} icon={list.icon} key={index} />
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
