import { useState } from "react"

type Props = {
  initialValue:number
  setValue:Function
  range:{
    min:number,
    max:number
  }
}

export const InputNumber = ({ initialValue, setValue, range }:Props)=>{
  const [value, setInternalValue] = useState(initialValue)

  const increaseValue = ()=>{
    const number = value + 1

    if((number>=range.min)&&(number<=range.max)){
      setValue(number)
      setInternalValue(number)
    }
  }

  const decreaseValue = ()=>{
    const number = value - 1

    if((number>=range.min)&&(number<=range.max)){
      setValue(number)
      setInternalValue(number)
    }
  }

  return(
    <div className="inline-flex bg-cyan-200 rounded-md overflow-hidden mx-2">
      <div className="bg-cyan-200 flex-row w-8 text-center">{value}</div>
      <div className=" flex flex-col">
        <button className="w-4 h-3 text-center pb-1 bg-sky-700 text-white text-xs hover:bg-cyan-600" onClick={increaseValue}>+</button>
        <button className="w-4 h-3 text-center pb-1 bg-sky-700 text-white text-xs hover:bg-cyan-600" onClick={decreaseValue}>-</button>
      </div>
    </div>
  )
}