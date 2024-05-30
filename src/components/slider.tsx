import { useState } from "react"

type SlideProps = {
  onChange:Function
}

export function Slider({onChange}:SlideProps){
  const [status, setStatus] = useState(false)
  const statusVariants = {
    false: 'self-end',
    true: 'self-start'
  }

  const onSlideChange = ()=>{
    setStatus(!status)
    onChange(status)
  }

  return(
    <div className="inline-flex flex-row mx-2 items-center">
      <div className="flex flex-col mr-2">
        <span>Symbol</span>
        <span>Numbers</span>
      </div>
      <button className="flex w-4 h-10 rounded-full bg-sky-700" onClick={onSlideChange}>
        <div className={`w-3 h-3 m-[.125rem] rounded-full bg-cyan-200 ${statusVariants[status?'false':'true']}`}></div>
      </button>
    </div>
  )
}