type Props = {
  index:string
  symbol:string
  value:string
  selectedId:string
  selectedIcon:string
  onClick:Function
  onDoubleClick:Function
  isMainExpression?:boolean
}

export default function Cell({ index, symbol, value, selectedId, selectedIcon, onClick, onDoubleClick, isMainExpression }:Props){
  const cellVariants = {
    normal: 'border-cyan-500 bg-cyan-200 ',
    selected: 'border-cyan-700 bg-cyan-400 ',
    mainExpression: 'border-cyan-400 bg-cyan-300'
  }
  let isSelected = false

  if(selectedIcon===symbol){
    isSelected = true
  }

  if(selectedId===index){
    isSelected = true
  }

  const cellVar = isSelected?'selected':isMainExpression?'mainExpression':'normal'

  return(
    <button
      className={`relative flex flex-col justify-end h-10 border-solid border-[1px] ${cellVariants[cellVar]}`}
      onClick={()=>onClick(index)}
      onDoubleClick={()=>onDoubleClick(symbol)}
    >
      <div className="text-2xl mx-[2px] px-1 w-8 text-left">{value.toUpperCase()??''}</div>
      <div className="absolute -top-[1px] -right-[1px] text-sm">{isMainExpression?'':symbol}</div>
    </button>
  )
}