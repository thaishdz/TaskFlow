import { useState } from "react"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { Dialog } from "./components/ui/Dialog"
import { TaskListForm } from "./components/ui/Form"

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <>
      <h1 className="text-4xl font-thin text-center mt-20">Board</h1>
      <div className="relative px-4 mt-8">
          <Button 
            onClick={openDialog}
            className="absolute top-0 right-4 md:right-96"
          >
            Add list
          </Button>
        <div className="pt-16">
        {
          Array.from({length: 4}).map((_, index) => (
            <Card key={index} />
          ))
        }
        </div>
      </div>
      <Dialog visible={isDialogOpen} onClose={closeDialog} >
        <TaskListForm />
      </Dialog>
    </>
  )
}

export default App
