import { useState } from "react"
import { GameConfigType } from "../App"
import { Button } from "../components/button"
import { GameSetup } from "../components/setup"
import gameRules from "../utils/gameRule.json"

type Props = {
  startGame:Function
  gameConfig:GameConfigType
  saveConfig: Function
}

export default function StartPage({ startGame, gameConfig, saveConfig }:Props){
  const [showSetup, setShowSetup] = useState(false)

  return(
    <div className='flex flex-col h-screen justify-between content-center items-center px-20 pt-2 pb-20 bg-gray-300'>
      <div className='flex justify-end w-full'>        
        <button></button>
      </div>
      <h1 className='font-logo text-7xl text-center'>🔎Cryptogram</h1>
      <div className='flex flex-col max-w-2xl indent-2'>
        <p>A cryptogram is a type of puzzle where a message or text is encrypted by substituting 
          each letter of the alphabet with another letter, number, or symbol. The goal of solving 
          a cryptogram is to decipher the original message by identifying the pattern of substitution.
        </p>
        <span>Games rules:</span>
        <ul className="list-disc list-inside">
            {gameRules.gameRules.map((rule, index)=>{
              return <li key={'li'+index}>{rule}</li>
            })}
        </ul>
      </div>
      <div className='flex justify-center gap-4'>
        <Button label="⚙️Setup" onClick={()=>setShowSetup(true)}/>
        <Button label="Start" onClick={()=>{startGame('loading')}}/>
      </div>
      <GameSetup visible={showSetup} config={gameConfig} setVisible={setShowSetup} saveSetup={saveConfig} />
    </div>
  )
}