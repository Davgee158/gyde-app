import React from 'react'
import { Link } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import backArrow from '../assets/arrow-back-basic-svgrepo-com.svg'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import Profile from '../assets/profile-circle-svgrepo-com.svg'
import PhoneLogo from '../assets/phone-contact.png'
import usePasswordToggle from '../hooks/usePasswordToggle'
import { signUpUser } from '../api/SignUpAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange'});

    const navigate = useNavigate()
    const [isTransitioning, setIsTransitioning] = useState(false)
    
    const {visible: passwordVisible, Icon: passwordIcon, togglePasswordVisiblity: togglePassword} = usePasswordToggle();
    const {visible: confirmPasswordVisible, Icon: confirmPasswordIcon, togglePasswordVisiblity: toggleConfirmPassword} = usePasswordToggle();

    console.log(errors);

    const onSubmit = async (data) => {
        try {
            const result = await signUpUser(data);
            console.log("signUp response", result)
            handleTransitionToOnboarding(data.email)
        } catch (error) {
            console.error("signUp failed", error)
        }
        
    } 

    const handleTransitionToOnboarding = (email) => {
       
        setIsTransitioning(true);
        
       
        setTimeout(() => {
            navigate('/otp', {state: { email } });
        }, 200);
    }


  return (
    <div className='signup-container relative min-h-screen pt-18 md:pt-0 md:flex md:justify-center md:items-center'
        style={{
            background: 'radial-gradient(circle at center 60%, #00a0c8 0%, #005e80 40%, #002940 70%, #00172a 100% )',
            height: '100%',
            width: '100%'
        }}>
        <div className='w-full absolute top-[10rem] bg-white rounded-tr-[4rem] py-8 px-8 flex flex-col md:block min-h-[calc(100vh-10rem)] md:min-h-auto md:w-3/5 mx-auto md:w-3/5 md:rounded-[4rem] md:py-10 md:px-14'>
            <div className='pb-2 md:pb-5'>
                <Link to= "/login"><img src={backArrow} alt="back-arrow" className='inline-block pr-2' /></Link>
                <span className='text-sm md:text-base'
                    style={{color: '#134e75'}}
                >Back to Login</span>
            </div>
            <h1 className='text-gray-800 text-3xl md:text-4xl font-extrabold mb-8 text-center'>Create new <span className='block'>Account</span></h1>
            <div className='px-6'>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        id='Name'
                        type='text'
                        placeholder='Name'
                        boxClass='md:py-4 md:rounded-4xl md:text-xl px-16'
                        divClass='md:py-5'
                        registerProps={register('name', {
                            required: 'This is required',
                        })}
                        errorMessage={errors.name?.message}
                        icon={
                            <img src={Profile} alt="profile" className='w-6 h-6 text-gray-500' />
                        }
                    />

                    <InputField
                        id='Email'
                        type='text'
                        placeholder='Email'
                        boxClass='md:py-4 md:rounded-4xl md:text-xl px-16'
                        divClass='md:py-5' 
                        registerProps={register('email', {
                            required: 'This is required',
                            validate: value => {
                                const testInput = document.createElement('input');
                                testInput.type = 'email';
                                testInput.value = value;
                                return testInput.checkValidity() || 'Please enter a valid email';
                            }
                        })}
                        errorMessage={errors.email?.message}
                        icon={
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <title>email</title>
                                <path d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM25.8,8,16,14.78,6.2,8ZM4,24V8.91l11.43,7.91a1,1,0,0,0,1.14,0L28,8.91V24Z" />
                            </svg>
                        }                 
                    />

                    <InputField 
                        id='PhoneNumber'
                        type='tel'
                        placeholder='Phone Number'
                        boxClass='md:py-4 md:rounded-4xl md:text-xl px-16'
                        divClass='md:py-5'
                        registerProps={register('number', {
                            required: 'This is required',
                            pattern: {
                                value: /^(?:0[789]\d{9}|[+]234[789]\d{9})$/,
                                message: 'Please enter a valid phone number',
                            },
                        })}
                        errorMessage={errors.number?.message}
                        icon={
                            <img src={PhoneLogo} alt="phone" className='w-6 h-6 text-gray-500' />
                        }
                    />

                    <div className='relative'>
                        <InputField 
                        id='Password'
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        boxClass='md:py-4 md:rounded-4xl md:text-xl px-16'
                        divClass='md:py-5'
                        registerProps={register('password', {
                            required: 'This is required',
                        })}
                        errorMessage={errors.password?.message}
                        icon={
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>lock</title>
                                <path d="M25 12h-1v-3.816c0-4.589-3.32-8.184-8.037-8.184-4.736 0-7.963 3.671-7.963 8.184v3.816h-1c-2.206 0-4 1.794-4 4v12c0 2.206 1.794 4 4 4h18c2.206 0 4-1.794 4-4v-12c0-2.206-1.794-4-4-4zM10 8.184c0-3.409 2.33-6.184 5.963-6.184 3.596 0 6.037 2.716 6.037 6.184v3.816h-12v-3.816zM27 28c0 1.102-0.898 2-2 2h-18c-1.103 0-2-0.898-2-2v-12c0-1.102 0.897-2 2-2h18c1.102 0 2 0.898 2 2v12zM16 18c-1.104 0-2 0.895-2 2 0 0.738 0.405 1.376 1 1.723v3.277c0 0.552 0.448 1 1 1s1-0.448 1-1v-3.277c0.595-0.346 1-0.985 1-1.723 0-1.105-0.895-2-2-2z"></path>
                            </svg>
                        }
                        />
                        <button 
                            type="button" 
                            onClick={togglePassword} 
                            className="absolute right-0 pr-6 top-[0.875rem] flex items-center cursor-pointer md:top-[1.25rem] md:pr-8"
                        >
                            <img src={passwordIcon} 
                             alt={passwordVisible ? "Hide Password" : "Show Password"} 
                            className="w-6 h-6" />
                        </button>
                    </div>

                    <div className='relative'>
                    <InputField
                        id='ConfirmPassword'
                        type={confirmPasswordVisible ? 'text' : 'password'} 
                        placeholder='Confirm Password'
                        boxClass='md:py-4 md:rounded-4xl md:text-xl px-16'
                        divClass='md:py-5'
                        registerProps={register('confirmPassword', {
                            required: 'This is required',
                            validate: (value, { password }) => value === password || 'The passwords do not match',
                        })}
                        errorMessage={errors.confirmPassword?.message}
                        icon={
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>lock</title>
                                <path d="M25 12h-1v-3.816c0-4.589-3.32-8.184-8.037-8.184-4.736 0-7.963 3.671-7.963 8.184v3.816h-1c-2.206 0-4 1.794-4 4v12c0 2.206 1.794 4 4 4h18c2.206 0 4-1.794 4-4v-12c0-2.206-1.794-4-4-4zM10 8.184c0-3.409 2.33-6.184 5.963-6.184 3.596 0 6.037 2.716 6.037 6.184v3.816h-12v-3.816zM27 28c0 1.102-0.898 2-2 2h-18c-1.103 0-2-0.898-2-2v-12c0-1.102 0.897-2 2-2h18c1.102 0 2 0.898 2 2v12zM16 18c-1.104 0-2 0.895-2 2 0 0.738 0.405 1.376 1 1.723v3.277c0 0.552 0.448 1 1 1s1-0.448 1-1v-3.277c0.595-0.346 1-0.985 1-1.723 0-1.105-0.895-2-2-2z"></path>
                            </svg>
                        }
                    />
                     <button 
                            type="button" 
                            onClick={toggleConfirmPassword} 
                            className="absolute right-0 pr-6 top-[0.875rem] flex items-center cursor-pointer md:top-[1.25rem] md:pr-8"
                        >
                            <img src={confirmPasswordIcon} 
                             alt={confirmPasswordVisible ? "Hide Password" : "Show Password"} 
                            className="w-6 h-6" />
                        </button>
                    </div>

                    
                    <SubmitButton text='Sign Up' customClass='md:py-4 md:text-2xl md:tracking-wider md:py-4 mt-5' />
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignupPage