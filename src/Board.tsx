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
    <div className="min-h-screen flex flex-col">
      <h1 className="text-4xl font-thin text-center mt-20">Board</h1>
      <div className="relative px-4 mt-8 flex-1">
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
      <footer className="text-center py-4 text-gray-500">
        Made with 🥶 by{' '}
        <a
          href="https://github.com/thaishdz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline"
        >
          thaishdz
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </footer>
    </div>
  )
}

export default Board
