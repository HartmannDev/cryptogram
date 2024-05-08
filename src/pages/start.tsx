export default function StartPage({ startGame }){
  return(
    <div className='flex flex-col h-screen justify-between content-center items-center px-20 py-20 bg-gray-300'>
      <div className='flex justify-end w-full'>        
        <button>Switch Theme</button>
      </div>
      <h1 className='font-logo text-7xl text-center'>🔎Cryptogram</h1>
      <div className='flex flex-col max-w-2xl bg-yellow-300'>
        <p>A cryptogram is a type of puzzle where a message or text is encrypted by substituting 
          each letter of the alphabet with another letter, number, or symbol. The goal of solving 
          a cryptogram is to decipher the original message by identifying the pattern of substitution.
        </p>
        <span>Games rules:</span>
        <ul>
          <li>abd</li>
          <li>abd</li>
          <li>abd</li>
        </ul>
      </div>
      <div className='flex justify-center'>
        <button
          className='bg-sky-700 px-10 py-2 rounded-full'
          onClick={()=>startGame(true)}
        >
          Start
        </button>
      </div>
    </div>
  )
}