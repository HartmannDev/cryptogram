type Props = {
  label:string
  onClick:Function
}
export const Button = ({ label, onClick }:Props)=>{

  return(
    <button
      className='bg-sky-700 px-2 py-2 w-32 rounded-xl z-10 border-b-4 border-cyan-800 transition duration-200
        hover:bg-cyan-600 hover:border-cyan-700'
      onClick={()=>onClick()}
    >
      <span className='text-white'>{label}</span>
    </button>
  )
}