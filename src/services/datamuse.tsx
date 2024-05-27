import { WordType } from "../App"
import { LettersPosition } from "../utils/gameSetup"

type datamuseResponseType = {
  word:string,
  score:number,
  defs?:[]
}

export const getMainExpretion = async (expressionLenght:number):Promise<WordType|any>=>{
  const wordLenght = Array(expressionLenght+1).fill('?')
  const baseLowcase = 97
  const topLowcase = 122
  
  //Randomizing the a letter to get a orininal word
  const randonCharPos = Math.round(Math.random()*expressionLenght)
  const randonChar = Math.round(Math.random()*(topLowcase-baseLowcase))+baseLowcase

  wordLenght[randonCharPos] = String.fromCharCode(randonChar)
  const wordFilter = wordLenght.join('')
  const url = `https://api.datamuse.com/words?sp=${wordFilter}&md=d`

  const response = await fetch(url)
  const data:datamuseResponseType[] = await response.json()
  
  const item:datamuseResponseType = getArrayRandomPosition(data)
  const expression:WordType = {
    word:item.word,
    question:item.defs?.shift()??''
  }
  return expression
}

export const getGameWords = async (expressionPosition:LettersPosition[], wordsLenght:number):Promise<any>=>{
  const wordsData:WordType[] = []

  for(let i=0; i<expressionPosition.length;i++){
    const exItem = expressionPosition[i]
    const wordLenght = Array(wordsLenght).fill('?')
    wordLenght[exItem.pos] = exItem.letter
    const url = `https://api.datamuse.com/words?sp=${wordLenght.join('')}&md=d&max=30`

    const response = await fetch(url)
    const data = await response.json()
    const item = getArrayRandomPosition(data, wordsLenght)
    const word:WordType = {
      word:item.word.replace(' ', ''),
      question:item.defs?.shift()??''
    }
    wordsData.push(word)
  }
  return wordsData
}

const getArrayRandomPosition = (arr:datamuseResponseType[], wordLenght?:number):datamuseResponseType=>{
  let isWordValid = true
  let randonPos = 0
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  do{
    randonPos = Math.round(Math.random()*(arr.length-1))
    if(!wordLenght){
      break
    }
    const item = arr[randonPos]
    try{
      const isWordLenghtCorrect = item.word.replace(' ', '').length === wordLenght
      const hasDefinition = item.hasOwnProperty('defs')
      const hasSpecialChar = format.test(item.word)
      if(isWordLenghtCorrect&&hasDefinition&&hasSpecialChar){
        isWordValid = true
      }
    }catch(err){
      console.log(err)
      console.log(item, arr, randonPos)
    }
    
  }while(!isWordValid)

  return arr[randonPos]
}