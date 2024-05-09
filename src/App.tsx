import { useState } from 'react'

import StartPage from './pages/start'
import GridGame from './pages/grid'
import { emojis } from "./utils/emojis"

type WordsDataType = {
  word:string
  question:string
}[]

export type LettersType = {
  letter:string
  emoji:string
}[]

export type GridMapType = {
  cellIndex:string
  value:string
  userValue:string
}[]

export type GameDataType ={
  config:{
    wordLenght:number
    words_quantity:number
  }
  mainExpression:{
    description:string
    expression:string
  }
  wordsData:WordsDataType
  lettersData:LettersType
  gridMap:GridMapType
}

const gameData:GameDataType = {
  config:{
    wordLenght:10,
    words_quantity:15
  },
  mainExpression:{
    description: 'asdf asdkjfha lsfhsakdjf haskjhkhklasdf bhkadfkh klsadhf ',
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
  ],
  lettersData:[],
  gridMap:[]
}

const mapGrid = ()=>{
  gameData.wordsData.map((word, lineID)=>{
    word.word.split('').map((letter, cellID)=>{
      gameData.gridMap.push({
        cellIndex:`L${lineID}-C${cellID}`,
        value:letter.toUpperCase(),
        userValue:''
      })
    })
  })
}

const getWordsLetters = (wordsData:WordsDataType)=>{
  const letters:LettersType = []
  let emojisInUse:string[] = emojis

  wordsData.map(word =>{
    word.word.split('').map(letter =>{
      if(!letters.find(el => el.letter.toUpperCase()===letter.toUpperCase())){
        const id = Math.floor(Math.random() * emojisInUse.length)
        letters.push({
          letter:letter.toUpperCase(),
          emoji:emojisInUse[id]
        })
        emojisInUse = emojisInUse.filter(el => el !== emojisInUse[id])
      }
    })
  })
  
  return letters
}

gameData.lettersData = getWordsLetters(gameData.wordsData)
mapGrid()
console.log(gameData.gridMap)

function App() {
  const [startGame, setStartGame] = useState(false)

  if(startGame){
    return <GridGame finishGame={setStartGame} gameData={gameData}/>
  }

  return <StartPage startGame={setStartGame}/>
}

export default App
