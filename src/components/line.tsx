import Cell from "./cell"
import { LettersType, GridMapType } from '../App'

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
  const lineVariants = {
    normal: 'border-cyan-500  bg-cyan-200',
    selected: 'bg-cyan-400'
  }

  const linelVar = selectedIndex.split('-')[0]===index?'selected':'normal'

  

  return(
    <div className="flex flex-row w-full">
      <button className={`flex-grow text-sm text-justify indent-2 px-1 py-1 leading-none h-10 border-solid border-[1px] border-cyan-500 ${lineVariants[linelVar]}`}>{question}</button>
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