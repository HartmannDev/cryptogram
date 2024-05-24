import { useRef, useState } from "react";
import { Button } from "./button";
import { GameConfigType } from "../App";
import { InputNumber } from "./inputNumber";

type Props = {
  visible:boolean
  config:GameConfigType
  setVisible:Function
  saveSetup:Function
}

export const GameSetup = ({ visible, setVisible, config, saveSetup }:Props)=>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  const [wordLenght, setWordLenght] = useState(config.wordLenght)
  const [wordQtd, setWordQtd] = useState(config.words_quantity)

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
            Game setup:
            <ul className="text-right">
              <li className="my-4">Lenght of words shown on the grip (horizontally):
                <InputNumber initialValue={wordLenght} setValue={setWordLenght} range={{min:5, max:11}}/>
              </li>
              <li className="my-4">Quantity of words shown on the grip (vertically):
                <InputNumber initialValue={wordLenght} setValue={setWordQtd} range={{min:5, max:16}}/>
              </li>
            </ul>
            <Button label='Save config' onClick={()=>{
              const newConfig:GameConfigType = {
                wordLenght: wordLenght,
                words_quantity: wordQtd
              }
              saveSetup(newConfig)
              setVisible(false)
            }}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}