import { useEffect, useState } from "react"

type Props = {
  startTime:number
}

export const Timer = ({ startTime }:Props)=>{
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const getTime = ()=>{
    const time = Date.now() - startTime

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / (1000 * 60)) % 60))
    setSeconds(Math.floor((time / 1000) % 60))
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000)

    return () => clearInterval(interval)
  }, [])



  return(
    <div className="flex flex-row">
      <div className="w-6 text-center">{`${hours<10?'0':''}${hours}`}</div>
      <div>:</div>
      <div className="w-6 text-center">{`${minutes<10?'0':''}${minutes}`}</div>
      <div>:</div>
      <div className="w-6 text-center">{`${seconds<10?'0':''}${seconds}`}</div>
    </div>
  )
}