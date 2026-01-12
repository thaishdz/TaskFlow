import { useState } from 'react'
import { Button } from './components/ui/Button'
import { Dialog } from './components/ui/Dialog'
import { TaskListForm } from './components/ui/Form'
import type { TaskListData } from './components/ui/Form/TaskListForm'
import { CardList } from './components/ui/Card/CardList'
import { useCards } from './context/CardsProvider'

function Board() {
  const { addList } = useCards()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const handleAddListAndClose = (newList: TaskListData) => {
    addList(newList)
    closeDialog()
  }

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
          <CardList />
        </div>
      </div>
      <Dialog visible={isDialogOpen} onClose={closeDialog}>
        <TaskListForm onSubmit={handleAddListAndClose} />
      </Dialog>
    </>
  )
}

export default Board
