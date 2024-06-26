import { useState } from 'react'

import StartPage from './pages/start'
import GridGame from './pages/grid'
import { emojis } from "./utils/emojis"

import { getGameWords, getMainExpretion } from "./services/datamuse"
import { LettersPosition, setExpressionGripPos } from "./utils/gameSetup"
import LoadingGame from './pages/loading'

export type WordType = {
  word:string
  question:string
}

type WordsDataType = WordType[]

export type LettersType = {
  letter:string
  emoji:string
}[]

export type GridMapType = {
  cellIndex:string
  value:string
  userValue:string
  isMainExpression:boolean
}[]

export type GameConfigType = {
  wordLenght:number
  words_quantity:number
  symbolType:'s'|'n'
}

export type GameDataType ={
  config:GameConfigType                  //Generica config about the game
  mainExpression?:WordType  //The WORD displayed vertically in the GRID without symbols
  wordsData:WordsDataType   //Set of WORDs displayed horizontally in the GRID with symbols
  lettersData:LettersType   //All the distinct LETTEs from WORDSDATA with their respecttive symbol 
  gridMap:GridMapType       //Map with all the GRID CELLs used to store the user input
  startedAt:number          //Moment when the game start
}

const gameData:GameDataType = {
  config:{
    wordLenght:9,
    words_quantity:13,
    symbolType: 's'
  },
  wordsData:[],
  lettersData:[],
  gridMap:[],
  startedAt: 0
}

let newGame = true

const mapGrid = (expressionPosition:LettersPosition[])=>{
  gameData.wordsData.map((word, lineID)=>{
    word.word.split('').map((letter, cellID)=>{
      gameData.gridMap.push({
        cellIndex:`L${lineID}-C${cellID}`,
        value:letter.toUpperCase(),
        userValue:'',
        isMainExpression:expressionPosition[lineID].pos===cellID
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

const GameInit = async (setLoadingGame:Function) =>{
  const wordLenght = gameData.config.wordLenght
  const expressionLenght = gameData.config.words_quantity

  const mainExpression:WordType = await getMainExpretion(expressionLenght)
  gameData.mainExpression = mainExpression

  const expressionPosition = setExpressionGripPos(wordLenght, gameData.mainExpression.word)
  const gameWords:WordType[] = await getGameWords(expressionPosition, wordLenght)
  gameData.wordsData = gameWords
  
  gameData.lettersData = getWordsLetters(gameData.wordsData)
  mapGrid(expressionPosition)
  gameData.startedAt = Date.now()
  setLoadingGame('running')
}

const clearPreviousGameData = ()=>{
  gameData.wordsData = []
  gameData.lettersData = []
  gameData.gridMap = []
  gameData.startedAt = 0
  delete gameData.mainExpression
}

const finishGame = (setGameStatus:Function)=>{
  setGameStatus('menu')
  newGame = true
  clearPreviousGameData()
}

const reloadGame = (setGameStatus:Function)=>{
  setGameStatus('loading')
  newGame = true
  clearPreviousGameData()
}

const setGameConfig = (config:GameConfigType)=>{
  gameData.config = config
}

function App() {
  const [gameStatus, setGameStatus] = useState('menu')
  const isLoading = gameStatus==='loading'

  if(isLoading&&newGame){
    newGame = false
    GameInit(setGameStatus)
  }

  if(isLoading){
    return <LoadingGame/>
  }

  if(gameStatus==='running'){
    return <GridGame
      finishGame={()=>{finishGame(setGameStatus)}}
      reloadGame={()=>{reloadGame(setGameStatus)}}
      gameData={gameData}
    />
  }

  return <StartPage startGame={setGameStatus} gameConfig={gameData.config} saveConfig={setGameConfig}/>
}

export default App
