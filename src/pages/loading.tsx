import Puzzle from '../assets/puzzle-piece.svg'

export default function LoadingGame(){
  return(
    <div className='flex flex-col h-screen justify-between content-center items-center px-20 pt-2 pb-20 bg-gray-300'>
      <div className='flex justify-between w-full'>
        <h1 className='font-logo text-lg text-center'>🔎Cryptogram</h1>
        <button>Switch Theme</button>
      </div>
      <div className="flex w-full h h-full my-1 justify-center items-center">
        <div className='absolute z-10 animate-puzzleF'>
          <div className='text-4xl animate-puzzleB'>🔎</div>
        </div>
        <img
          className='w-20 animate-pulse'
          src={Puzzle}
          alt=""
        />
      </div>
    </div>
  )
}