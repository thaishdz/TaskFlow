import { useState } from 'react'
import { Button } from './components/ui/Button'
import { Dialog } from './components/ui/Dialog'
import { TaskListForm } from './components/ui/Form'
import type { TaskListData } from './components/ui/Form/TaskListForm'
import { CardList } from './components/ui/Card/CardList'
import { useCards } from './context/CardsProvider'
import clsx from 'clsx'

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
          className={clsx(
            'flex fixed px-5 py-5 shadow-xl scale-100',

            'top-35 right-4',

            'md:top-auto md:bottom-25 md:right-15'
          )}
        ></Button>
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
