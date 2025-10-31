import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"

function App() {
  return (
    <>
      <h1 className="text-4xl font-thin text-center mt-35">My Task Board</h1>
      <div>
        {
          Array.from({length: 4}).map((_, index) => (
            <Card key={index} />
          ))
        }
      </div>
      <div className="flex justify-end border">
        <Button />
      </div>
    </>
  )
}

export default App
