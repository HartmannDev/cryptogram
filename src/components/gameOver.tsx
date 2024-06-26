import { useRef } from "react";
import { Button } from "./button";

type Props = {
  visible:boolean
  setVisible:Function
  finishGame:Function
  reloadGame:Function
  startDate:number
}

export const GameOver = ({ visible, setVisible, finishGame, reloadGame, startDate }:Props)=>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  const time = Date.now() - startDate
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const seconds = Math.floor((time / 1000) % 60)

  return (
    <>
      {visible ? (
        <div
          className="absolute flex flex-row top-0 left-0 w-full h-full z-50 justify-center items-center bg-cyan-400 bg-opacity-40"
          onClick={(e) => {
            if (modalRef.current?.contains(e.target as Node)??true) return
            setVisible(false)
          }}
        >
          <div className="flex flex-col justify-center items-center bg-cyan-500 rounded-2xl p-5 shadow-md border-b-2 border-cyan-600" ref={modalRef}>
            <h1 className="text-3xl">Congrats!</h1>
            <p className="text-lg">You've completed this puzzel</p>
            <span className="text-lg mb-2">{`Time: ${hours<10?'0':''}${hours}:${minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`}</span>
            <div className="grid grid-flow-col gap-3">
              <Button label='Menu' onClick={()=>{
                setVisible(false)
                finishGame('menu')
              }}/>
              <Button label='Play Again' onClick={() => {
                setVisible(false)
                reloadGame('loading')
              }}/>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}