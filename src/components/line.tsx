import Cell from "./cell"
import { LettersType, GridMapType } from '../App'
import { useState } from "react"

type Props = {
  index:string
  question:string
  word:string
  selectedIndex:string
  selectedSymbol:string
  onCellClick:Function
  onCellDoubleClick:Function
  lettersData:LettersType,
  gridMap:GridMapType
}

export default function Line({index, question, word, selectedIndex ,selectedSymbol , onCellClick, onCellDoubleClick, lettersData, gridMap}:Props){
  const [popover, setPopover] = useState(false)
  const lineVariants = {
    normal: 'border-cyan-500  bg-cyan-200',
    selected: 'bg-cyan-400'
  }

  const linelVar = selectedIndex.split('-')[0]===index?'selected':'normal'

  const showAnswer = ()=>{
    setPopover(true)
    const hideAnswer = setInterval(()=>{
      setPopover(false)
      clearInterval(hideAnswer)
    }, 1000)
  }

  return(
    <div className="flex flex-row w-full">
      <div
        className={`flex flex-grow text-sm text-justify indent-2 px-1 py-1 leading-none h-10 border-solid border-[1px]
        border-cyan-500 ${lineVariants[linelVar]}`}
      >
        <span className="flex-grow">{question}</span>
        <button className="text-center relative" onClick={showAnswer}>
          🤔
          {popover?<div
            className="absolute p-2 translate-y-[90%] bottom-0 right-0 bg-cyan-700 z-10 text-white rounded-md animate-textPulse"
          >
            {word.toUpperCase()}
          </div>:''}
        </button>
      </div>
      {
      word.split('').map(( char, id ) =>{
        const cellId = `${index}-C${id}`
        const cell = gridMap.find(cell=>cell.cellIndex===cellId)
        const userValue = cell?.userValue
        return(
          <Cell
            key={cellId}
            index={cellId}
            value={userValue??''}
            selectedId={selectedIndex}
            selectedIcon={selectedSymbol}
            symbol={lettersData.filter(el=>el.letter===char.toUpperCase())[0].emoji}
            onClick={onCellClick}
            onDoubleClick={onCellDoubleClick}
            isMainExpression={cell?.isMainExpression}
          />
        )
      })
      }
    </div>
  )
}