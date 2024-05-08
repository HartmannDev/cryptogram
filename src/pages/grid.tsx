import { useState } from "react";
import Cell from "../components/cell";
import Line from "../components/line";

type GameData ={
  config:{
    wordLenght:number;
    words_quantity:number;
  },
  mainExpression:{
    description:string;
    expression:string
  },
  wordsData:{
    word:string;
    question:string;
  }[]
}

export default function GridGame({ finishGame }){
  const [selectedCell, setSelectedCell] = useState('')

  const gameData:GameData = {
    config:{
      wordLenght:10,
      words_quantity:15
    },
    mainExpression:{
      description: 'xxx',
      expression: 'xxx'
    },
    wordsData:[
      {
        question: "What is a term for the abrasive quality of a substance?",
        word: "Abrasively"
      },
      {
        question: "What field of medicine specializes in the study of the heart?",
        word: "Cardiology"
      },
      {
        question: "What term describes the flow of a river moving towards the sea?",
        word: "Downstream"
      },
      {
        question: "What word means radiant brightness or splendor?",
        word: "Effulgence"
      },
      {
        question: "What do you call substances that cannot be dissolved?",
        word: "Insolvents"
      },
      {
        question: "What word means placed side by side for comparison or contrast?",
        word: "Juxtaposed"
      },
      {
        question: "What unit of measurement is used to measure distances?",
        word: "Kilometers"
      },
      {
        question: "What word describes something worthy of grief or regret?",
        word: "Lamentable"
      },
      {
        question: "What word describes the act of providing with nourishment?",
        word: "Nourishing"
      },
      {
        question: "What word means to mimic actions or gestures without speech?",
        word: "Pantomimed"
      },
      {
        question: "What word means to satisfy one's thirst by drinking?",
        word: "Quenchings"
      },
      {
        question: "What word describes something resonating deeply or strongly?",
        word: "Resonantly"
      },
      {
        question: "What term means to occur at the same time or rate?",
        word: "Synchroniz"
      },
      {
        question: "What word describes the act of shortening something by cutting off parts?",
        word: "Truncating"
      },
      {question: "What word means the act of regarding someone with deep respect or reverence?",
        word: "Veneration"
      }
    ]
  }

  return(
    <div className="flex flex-col h-screen justify-between content-center items-center px-20 py-20 bg-gray-300">
      <div className='flex justify-between w-full'>
        <h1 className='font-logo text-lg text-center'>🔎Cryptogram</h1>
        <button>Switch Theme</button>
      </div>
      <div>
        {
          gameData.wordsData.map((item, index)=>{
            return(
              <Line key={`L${index}`} index={`L${index}`} question={item.question} word={item.word} selectedIndex={selectedCell} onCellClick={setSelectedCell}/>
            )
          })
        }
      </div>
      <button onClick={()=>finishGame(false)}>come back</button>
    </div>
  )
}