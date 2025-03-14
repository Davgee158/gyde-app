import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginBg from "../assets/login-bg.png";
import "../styles/loginPage.css";
import appleLogo from "../assets/apple.png";
import googleLogo from "../assets/google.png";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { loginUser } from "../api/LoginAuth";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";


const loginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const {visible, Icon, togglePasswordVisiblity} = usePasswordToggle();

    const onSubmit = async (data) => {
        try {
            const result = await loginUser(data);
            console.log("Login response", result);
        } catch (error) {
            console.error("Login failed", error);
        }
    }


   console.log(errors);


    return (
        <div className="login-container relative min-h-screen" >
            <div className="bg-logo absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: "cover",
            }}>
            </div>
            <div className="bg-form rounded-tr-[4rem] px-10 py-6 bg-white" style={{minHeight: "calc(100vh - 22rem)"}}>
                <h1 className="text-gray-800 text-3xl font-bold mb-5">Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        id="email"
                        type="email"
                        placeholder="Email"
                        registerProps={register("email", {
                            required: "This is required",
                            validate: value => {
                                const testInput = document.createElement("input");
                                testInput.type = "email";
                                testInput.value = value;
                                return testInput.checkValidity() || "Please enter a valid email";
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
                    <div className="relative">
                        <InputField
                            id="password"
                            type={visible ? "text" : "password"}
                            placeholder="Password"
                            registerProps={register("password", {
                                required: "This is required",
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
                    
                    <p className="text-right text-sky-950 font-semibold text-sm mb-4 cursor-pointer">Forgot Password?</p>
                    <SubmitButton text="Login" />
                    <div className="flex items-center w-full gap-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="font-normal text-gray-500 text-xs">Or login with</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <img src={googleLogo} className="w-8 h-8 cursor-pointer" alt="google-logo"/>   
                        <img src={appleLogo} className="w-8 h-8 cursor-pointer" alt="apple-logo" />
                    </div>
                </form>
                <p className="font-normal text-gray-500 text-xs text-center py-10">Dont' have an account?
                    <Link to="/signup" className="text-sky-950 font-bold">Sign Up</Link>
                    </p>
            </div>
        </div>
    )
}
export default loginPage