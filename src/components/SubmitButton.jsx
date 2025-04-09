import React from "react";


const SubmitButton = ({ text, customClass }) => {
  return (
    <button 
        type="submit" 
        className={`w-full py-3 bg-sky-950 text-white rounded-3xl text-lg font-bold mb-6 cursor-pointer ${customClass}`}>
        {text}
    </button>
  )
}

export default SubmitButton