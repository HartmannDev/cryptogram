import { useEffect, useState } from "react"

import Line from "../components/line"
import { GameDataType } from '../App'
import { GameOver } from "../components/gameOver"
import { Button } from "../components/button"
import { Timer } from "../components/timer"

type Props = {
  finishGame:Function
  reloadGame:Function
  gameData:GameDataType
}

export default function GridGame({ finishGame, reloadGame, gameData }:Props){
  const [selectedCell, setSelectedCell] = useState('')
  const [selectedSymbol, setSelectedSymbol] = useState('')
  const [gameOver, setGameOver] = useState(false)

  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(()=>{
    setSelectedSymbol('')
  },[selectedCell])

  const isGameOver = ()=>{
    let gameOver = true
    gameData.gridMap.forEach(cell => {
      if(cell.userValue.toUpperCase()!==cell.value.toUpperCase()){
        gameOver=false
        return
      }
    })

    if(gameOver){
      setGameOver(true)
    }
  }

  const moveSelection = (key:string)=>{
    const line = Number(selectedCell.split('-')[0].replace('L',''))
    const cell = Number(selectedCell.split('-')[1].replace('C',''))
    const horizontalLimite = gameData.config.wordLenght-1
    const vertivalLimit = gameData.config.words_quantity-1
    let newCell = ''
    let moviment
    let corretMoviment

    switch(key){
      case 'ArrowRight':
        moviment = cell+1
        corretMoviment = moviment>horizontalLimite?cell:moviment
        newCell = `L${line}-C${corretMoviment}`
        setSelectedCell(newCell)
        break
      case 'ArrowLeft':
        moviment = cell-1
        corretMoviment = moviment<0?cell:moviment
        newCell = `L${line}-C${corretMoviment}`
        setSelectedCell(newCell)
        break
      case 'ArrowUp':
        moviment = line-1
        corretMoviment = moviment<0?cell:moviment
        newCell = `L${moviment}-C${cell}`
        setSelectedCell(newCell)
        break
      case 'ArrowDown':
        moviment = line+1
        corretMoviment = moviment>vertivalLimit?cell:moviment
        newCell = `L${corretMoviment}-C${cell}`
        setSelectedCell(newCell)
        break
    }
  }

  const handleKeyDown = (event:React.KeyboardEvent<HTMLDivElement>)=>{
    if(selectedCell===''){
      return
    }
    let key = event.key
    const regex = /[a-zA-z]{1}$/gm

    if(!regex.test(key)){return}

    if(key.length>1){
      if((key==='Delete')||(key==='Backspace')){
        key = ''
      }else{
        if(key.match(/^Arrow/g)){
          moveSelection(key)
        }
        return
      }
    }

    const cellIndex = gameData.gridMap.findIndex(el=>el.cellIndex===selectedCell)
    gameData.gridMap[cellIndex].userValue = key.toUpperCase()
    isGameOver()
    setKeyPressed(!keyPressed)
  }

  return(
    <div 
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex flex-col h-screen justify-between content-center items-center px-20 pt-2 pb-20 bg-gray-300"
    >
      <div className='flex justify-between w-full'>
        <h1 className='font-logo text-lg text-center'>🔎Cryptogram</h1>
        <Timer startTime={gameData.startedAt}/>
        <button></button>
      </div>
      <div className="text-sm text-justify w-full indent-2 my-1">
        {gameData.mainExpression?.question}
      </div>
      <div>
        {
          gameData.wordsData.map((item, index)=>{
            return(
              <Line
                key={`L${index}`}
                index={`L${index}`}
                question={item.question}
                word={item.word}
                selectedIndex={selectedCell}
                selectedSymbol={selectedSymbol}
                onCellClick={setSelectedCell}
                onCellDoubleClick={setSelectedSymbol}
                lettersData={gameData.lettersData}
                gridMap={gameData.gridMap}
              />
            )
          })
        }
      </div>
      <div className="flex flex-row gap-4">
        <Button label='Menu' onClick={()=>finishGame()}/>
        <Button label='Reload' onClick={()=>reloadGame()}/>
      </div>
      <GameOver
        visible={gameOver}
        setVisible={setGameOver}
        finishGame={()=>finishGame()}
        reloadGame={()=>reloadGame()}
        startDate={gameData.startedAt}
      />
    </div>
  )
}