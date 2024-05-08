type Props = {
  index:string;
  symbol:string;
  value:string;
  visible:boolean;
  selected:string;
  onClick:Function
}

export default function Cell({ index, symbol, value, visible, selected, onClick }:Props){
  const cellVariants = {
    normal: 'border-cyan-500',
    selected: 'border-red-800'
  }
  
  const cellVar = selected===index?'selected':'normal'

  return(
    <button
      className={`relative flex bg-cyan-200 w-[40px] h-10 border-solid border-[1px] ${cellVariants[cellVar]}`}
      onClick={()=>onClick(index)}
    >
      <div className="text-3xl mx-1">{visible?value.toUpperCase():''}</div>
      <div className="absolute -top-[1px] -right-[1px] text-sm">{symbol}</div>
    </button>
  )
}