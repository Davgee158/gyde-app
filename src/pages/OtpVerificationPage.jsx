import React from 'react'
import { useState, useRef, useEffect } from 'react'
import backArrow from '../assets/arrow-back-basic-svgrepo-com.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const OtpVerificationPage = () => {
    const location = useLocation()
    const [otp, setOtp] = useState(["","","",""])
    const [errorMessage, setErrorMessage] = useState("")
    const [timer, setTimer] = useState(0);
    
    const inputRefs = useRef(Array(5).fill(null))

    const navigate = useNavigate();

    const { email } = location.state || {}

    useEffect(() => {
        if (!email) {
          navigate("/signup");
        }
      }, [email, navigate]);

    useEffect(() => {
        if(timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const handleChange = (value, index) => {
        const newValue = value.slice(-1)

        const newOtp = [...otp]
        newOtp[index] = newValue;
        setOtp(newOtp)

        if (newValue && index < otp.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if(e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1].focus()
        } else if (e.key === "Backspace" && !otp[index] && index > 0) {
            if(otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if(index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    }

    const handleSubmit = async () => {
        const code = otp.join("");
        console.log("Entered OTP code:", code);
        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", { email, code });
            console.log("Response data:", data);
            
            if (data.success) {
                console.log("OTP verified successfully!");
                setErrorMessage("");
                navigate("/setpin");
            } else {
                console.error("OTP verification failed:", data.message);
                setErrorMessage(data.message || "OTP verification failed.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setErrorMessage("An error occurred while verifying OTP. Please try again.");
        }
    };

    const handleResend = async () => {
        if(timer > 0) return;

        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", { email })

            if(data.success) {
                console.log("OTP resent successfully!")
                setTimer(60);
            } else {
                console.error("Failed to resend OTP:", data.message)
            }
        } catch (error) {
            console.error("Error resending OTP:", error)
        }
    }


  return (
    <div className='otp-container relative min-h-screen pt-20 md:flex md:justify-center md:items-center md:pt-0' 
    style={{
        background: 'radial-gradient(circle at center 60%, #00a0c8 0%, #005e80 40%, #002940 70%, #00172a 100% )',
        height: '100%',
        width: '100%'
    }}>
        <div className='w-full absolute top-[9rem] bg-white rounded-tr-[4rem] py-8 px-8 flex flex-col md:block min-h-[calc(100vh-9rem)] md:min-h-auto md:w-3/5 mx-auto md:w-3/5 md:rounded-[4rem] md:py-10 md:px-14'>
            <div className='px-6'>
                <Link to= "/login"><img src={backArrow} alt="back-arrow" className='inline-block pr-2' /></Link>
                 <span className='text-sm md:text-lg'
                    style={{color: '#134e75'}}
                >Back to Login</span>
            </div>

            <div className='flex-1 p-4'>
                <h2 className='font-bold text-3xl mb-4 md:text-4xl md:mb-6'>OTP Verification</h2>
                <p className='mb-6 md:text-2xl md:mb-9'>Enter the code sent to your email <span className='font-semibold underline text-cyan-500'>{email}</span></p>

                <div className='flex space-x-2 mb-4 md:space-x-4 md:mb-7'>
                    {otp.map((digit, index) => (
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
                {errorMessage && (
                    <div className="mb-4 text-red-600 font-semibold md:text-lg">
                        {errorMessage}
                    </div>
                )}
                <div className='mb-4 md:text-xl'>
                    <p>Didn't get a code?{" "}
                        <button 
                            onClick={handleResend} 
                            className='underline text-cyan-500 font-semibold ' 
                            disabled={timer > 0}>
                                {timer > 0 ? `Resend code (${timer}s)` : "Resend code"}
                        </button>
                    </p>
                </div>
                
            </div>
         
            <div>
                <button onClick={handleSubmit} className='w-full py-3 bg-sky-950 text-white rounded-3xl text-lg font-bold mb-6 cursor-pointer md:py-4 md:text-2xl md:tracking-wide md:mt-3'>Continue</button>
            </div>
                   
        </div>
    </div>
  )
}

export default OtpVerificationPage