import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import SignUpBg from '../assets/login-without-bg.png'
import backArrow from '../assets/arrow-back-basic-svgrepo-com.svg'
import InputField from '../components/InputField'
import SubmitButton from '../components/SubmitButton'
import Profile from '../assets/profile-circle-svgrepo-com.svg'
import PhoneLogo from '../assets/phone-contact.png'
import usePasswordToggle from '../hooks/usePasswordToggle'
import { signUpUser } from '../api/SignUpAuth'
import appleLogo from "../assets/apple.png";
import googleLogo from "../assets/google.png";


const signupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange'});
    
    const {visible, Icon, togglePasswordVisiblity} = usePasswordToggle();

    console.log(errors);

    const onSubmit = async (data) => {
        try {
            const result = await signUpUser(data);
            console.log("signUp response", result)
        } catch (error) {
            console.error("signUp failed", error)
        }
        
    } 


  return (
    <div className='signup-container relative'>
        <div className='signup-form h-[15rem] w-full bg-cover bg-center bg-no-repeat'
            style={{backgroundImage: `url(${SignUpBg})`,
            backgroundPosition: 'center 31%',
        }}></div>
        <div className='w-full absolute top-[10rem] bg-white rounded-tr-[4rem] py-8 px-8'>
            <div className='pb-2'>
                <Link to= "/login"><img src={backArrow} alt="back-arrow" className='inline-block pr-2' /></Link>
                <span className='text-sm'
                    style={{color: '#134e75'}}
                >Back to Login</span>
            </div>
            <h1 className='text-gray-800 text-3xl font-extrabold mb-8 text-center'>Create new <span className='block'>Account</span></h1>
            <div className='px-6'>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        id='Name'
                        type='text'
                        placeholder='Name'
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
                        type={visible ? 'text' : 'password'}
                        placeholder='Password'
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
                            onClick={togglePasswordVisiblity} 
                            className="absolute right-0 pr-6 top-[0.875rem] flex items-center cursor-pointer"
                        >
                            <img src={Icon} 
                             alt={visible ? "Hide Password" : "Show Password"} 
                            className="w-6 h-6" />
                        </button>
                    </div>

                    <div className='relative'>
                    <InputField
                        id='ConfirmPassword'
                        type={visible ? 'text' : 'password'} 
                        placeholder='Confirm Password'
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
                            onClick={togglePasswordVisiblity} 
                            className="absolute right-0 pr-6 top-[0.875rem] flex items-center cursor-pointer"
                        >
                            <img src={Icon} 
                             alt={visible ? "Hide Password" : "Show Password"} 
                            className="w-6 h-6" />
                        </button>
                    </div>

                    <SubmitButton text='Sign Up' />
                    <div className="flex items-center w-full gap-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="font-normal text-gray-500 text-xs">Or login with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6 mb-4">
                        <img src={googleLogo} className="w-8 h-8 cursor-pointer" alt="google-logo"/>   
                        <img src={appleLogo} className="w-8 h-8 cursor-pointer" alt="apple-logo" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default signupPage