import { useState } from 'react'
import StartPage from './pages/start'
import GridGame from './pages/grid'

function App() {
  const [startGame, setStartGame] = useState(false)

  if(startGame){
    return <GridGame finishGame={setStartGame}/>
  }

  return <StartPage startGame={setStartGame}/>
}

export default App
