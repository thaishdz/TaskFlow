import { useState } from "react"
import { type EmojiName, Emoji} from "../Emoji"
import { Button } from "../Button";


const createList = () => {
    console.log('createList called!')
}

export const TaskListForm = () => {
    const [title, setTitle] = useState<string>('')
    const [icon, setIcon] = useState<EmojiName | undefined>(undefined)
    const [tasks, setTasks] = useState<string[]>([])

    const emojiOptions: EmojiName[] = ['travel', 'chores', 'personal'];

    return(
        <form className="flex flex-col gap-6 w-full">
            <h2 className="text-xl text-bold">Add list</h2>
            <label className="text-sm font-medium text-gray-500" htmlFor="title">Title</label>
            <input 
                type="text" 
                id="title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., My Awesome List"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                    placeholder:text-gray-400
                "
            />

            <label className="text-sm font-medium text-gray-500" htmlFor="icon">Icon</label>
            <div className="flex gap-2">
                {
                    emojiOptions.map((name) => (
                        <button 
                            key={name} onClick={() => setIcon(name)}
                            className="bg-gray-200 p-4 px-5 rounded-xl hover:bg-yellow-500 cursor-pointer shadow-lg"
                        >
                            <Emoji name={name} />
                        </button>
                    ))
                } 
            </div>
            <label className="text-sm font-medium text-gray-500" htmlFor="tasks">Tasks</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    id="task" 
                    value={tasks}
                    placeholder="e.g., Play Expedition 33" 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                        placeholder:text-gray-400
                    "
                 />
                <Button type="add" onClick={() => console.log('clicked')} />
            </div>
            <Button type="add" onClick={createList}>Create List</Button>
        </form>
    )
}