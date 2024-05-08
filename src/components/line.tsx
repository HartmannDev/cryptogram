import Cell from "./cell";

type Props = {
  index:string,
  question:string,
  word:string,
  selectedIndex:string,
  onCellClick:Function
}

export default function Line({index, question, word, selectedIndex, onCellClick}:Props){
  const lineVariants = {
    normal: 'border-cyan-500',
    selected: 'border-red-800'
  }

  const linelVar = selectedIndex.substring(0,2)===`L${index}`?'selected':'normal'

  return(
    <div className="flex flex-row w-full">
      <button className={`flex-grow text-sm text-justify bg-cyan-200 h-10 border-solid border-[1px] ${lineVariants[linelVar]}`}>{question}</button>
      {
      word.split('').map(( char, id ) =>{
        return(
          <Cell key={`${index}-C${id}`} index={`${index}-C${id}`} value={char} visible={true} selected={selectedIndex} symbol="👌" onClick={onCellClick}/>
        )
      })
      }
    </div>
  )
}