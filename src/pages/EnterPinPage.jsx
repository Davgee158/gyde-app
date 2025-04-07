import React, { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import backArrow from '../assets/arrow-back-basic-svgrepo-com.svg'
import axios from 'axios';

const EnterPinPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pin, setPin] = useState(["", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const inputRefs = useRef(Array(4).fill(null));

    const handleChange = (value, index) => {
        if(!/^\d*$/.test(value)) return;
        const newValue = value.slice(-1);
        const newPin = [...pin];
        newPin[index] = newValue;
        setPin(newPin);

        if(newValue && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus()
        }
    };

    const handleKeyDown = (e, index) => {
        if(e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if(e.key === 'ArrowRight' && index < 3) {
            inputRefs.current[index + 1].focus();
        } else if(e.key === 'Backspace' && !pin[index] && index > 0) {
            if(pin[index]) {
                const newPin = [...pin];
                newPin[index] = "";
                setPin(newPin);
            } else if(index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    }
    const handleSubmit = async() => {
        if(pin.some(digit => digit === "")) {
            setErrorMessage("Please enter a complete 4-digit PIN")
            return;
        }
        const pinCode = pin.join("")
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { pin: pinCode });
            console.log("PIN submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting PIN:", error);
            setErrorMessage("Failed to submit PIN. Please try again.");
        }
        navigate("", { state: { pin: pinCode } })
    }


  return (
    <div className='setPin-container relative min-h-screen pt-20 md:flex md:justify-center md:items-center md:pt-0' 
        style={{
            background: 'radial-gradient(circle at center 60%, #00a0c8 0%, #005e80 40%, #002940 70%, #00172a 100% )',
            height: '100%',
            width: '100%'
        }}>
            <div className='w-full absolute top-[10rem] md:top-[15rem] bg-white rounded-tr-[4rem] py-8 px-8 flex flex-col md:block min-h-[calc(100vh-10rem)] md:min-h-auto md:w-3/5 mx-auto md:w-3/5 md:rounded-[4rem] md:py-10 md:px-14'>
                <div className='px-6 md:mb-2'>
                        <Link to= "/login"><img src={backArrow} alt="back-arrow" className='inline-block pr-2' /></Link>
                        <span className='text-sm md:text-lg'
                            style={{color: '#134e75'}}
                            >Back to Login</span>
                </div>
                <div className='flex-1 p-4'>
                    <h2 className='font-bold text-3xl mb-4 md:text-4xl md:mb-6'>Enter your PIN</h2>
                    <div className='flex space-x-2 mb-4 md:space-x-4 md:mb-7'>
                        {pin.map((digit, index) => (
                            <input 
                                type="text"
                                className='w-12 h-12 border border-gray-500 text-center text-2xl rounded-2xl focus:outline-2 focus:border-sky-600 md:w-16 md:h-16'
                                key={index}
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    <div>
                        <p className='text-sky-900 md:text-xl'>Enter your four digit pin</p>
                    </div>
                    {errorMessage && (
                        <div className="mt-2 text-red-600 font-semibold animate-fadeIn md:text-lg">
                            {errorMessage}
                        </div>
                    )}
                    
                </div>
    
                <div>
                    <button onClick={handleSubmit} type='button' className='w-full py-3 bg-sky-950 text-white rounded-3xl text-lg font-bold mb-6 cursor-pointer md:py-4 md:text-2xl md:tracking-wide md:mt-3'>Continue</button>
                </div>
            </div>
        </div>
  )
}

export default EnterPinPage