import React from "react";


const SubmitButton = ({ text }) => {
  return (
    <button 
        type="submit" 
        className="w-full py-3 bg-sky-950 text-white rounded-3xl text-lg font-bold mb-6 cursor-pointer">
        {text}
    </button>
  )
}

export default SubmitButton