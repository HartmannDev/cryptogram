type Props = {
  index:string
  symbol:string
  value:string
  selectedId:string
  selectedIcon:string
  onClick:Function
  onDoubleClick:Function
}

export default function Cell({ index, symbol, value, selectedId, selectedIcon, onClick, onDoubleClick }:Props){
  const cellVariants = {
    normal: 'border-cyan-500 bg-cyan-200 ',
    selected: 'border-cyan-950 bg-cyan-400 '
  }
  let isSelected = false

  if(selectedIcon===symbol){
    isSelected = true
  }

  if(selectedId===index){
    isSelected = true
  }

  const cellVar = isSelected?'selected':'normal'

  return(
    <button
      className={`relative flex flex-col justify-end h-10 border-solid border-[1px] ${cellVariants[cellVar]}`}
      onClick={()=>onClick(index)}
      onDoubleClick={()=>onDoubleClick(symbol)}
    >
      <div className="text-2xl mx-[2px] px-1 w-8 text-left">{value.toUpperCase()??''}</div>
      <div className="absolute -top-[1px] -right-[1px] text-sm">{symbol}</div>
    </button>
  )
}