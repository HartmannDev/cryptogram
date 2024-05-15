export type LettersPosition = {
  letter:string
  pos:number
}

export const setExpressionGripPos = (gridWidth:number, word:string):LettersPosition[] =>{
  const letters = word.split('')
  let positions:LettersPosition[] = []
  let currentPosition = Math.round(Math.random()*gridWidth/2)
  letters.forEach((letter =>{
    if(letter===' '){
      currentPosition++
      return
    }
    positions.push({letter:letter, pos: currentPosition})
  }))

  return positions
}