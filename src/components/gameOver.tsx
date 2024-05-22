import { useRef } from "react";
import { Button } from "./button";

type Props = {
  visible:boolean
  setVisible:Function
  finishGame:Function
  reloadGame:Function
}

export const GameOver = ({ visible, setVisible, finishGame, reloadGame }:Props)=>{
  const modalRef = useRef(null)

  return (
    <>
      {visible ? (
        <div
          className="absolute flex flex-row top-0 left-0 w-full h-full z-50 justify-center items-center bg-cyan-400 bg-opacity-40"
          onClick={(e) => {
            if (modalRef.current.contains(e.target)??true) {
              return
            }
            console.log('trying to close')
            setVisible(false)
          }}
        >
          <div className="flex flex-col justify-center items-center bg-cyan-500 rounded-2xl p-5 shadow-md border-b-2 border-cyan-600" ref={modalRef}>
            <h1 className="text-3xl">Congrats!</h1>
            <p className="text-lg">You've completed this puzzel</p>
            <span className="text-lg mb-2">Time: 00:00</span>
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