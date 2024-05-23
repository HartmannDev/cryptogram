import { Button } from "../components/button"
import gameRules from "../utils/gameRule.json"

export default function StartPage({ startGame }:{startGame:Function}){
  return(
    <div className='flex flex-col h-screen justify-between content-center items-center px-20 pt-2 pb-20 bg-gray-300'>
      <div className='flex justify-end w-full'>        
        <button>Switch Theme</button>
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
      <div className='flex justify-center'>
        <Button label="Start" onClick={()=>{startGame('loading')}}/>
      </div>
    </div>
  )
}