import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/loginPage.css";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { loginUser } from "../api/LoginAuth";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import Logo from "../assets/gyde-small.svg"
import GydeLogo from "../assets/Gyde-logo seperate-cropped.svg"


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const {visible, Icon, togglePasswordVisiblity} = usePasswordToggle();

    const onSubmit = async (data) => {
        try {
            const result = await loginUser(data);
            console.log("Login response", result);
            navigate("/enterpin");
        } catch (error) {
            console.error("Login failed", error);
        }
    }


   console.log(errors);


    return (
        <div className="login-container flex flex-col relative min-h-screen pt-10 md:block md:pt-0"
        style={{
            background: 'radial-gradient(circle at center 60%, #00a0c8 0%, #005e80 40%, #002940 70%, #00172a 100% )',
            height: '100%',
            width: '100%'
        }}> 
            <div className=" flex justify-center items-center pl-[2rem] mb-2 md:mb-14 pt-8">
                <img src={Logo} alt="gyde" className="w-[10rem] h-[10rem]"/>
                <img src={GydeLogo} alt="gyde-logo" className="w-[10rem] h-[10rem] relative left-[-5.9rem]" />
            </div>
            <div className="mt-auto rounded-tr-[4rem] px-10 py-6 bg-white mx-auto w-full md:w-3/5 md:rounded-[4rem] md:py-10 md:px-14">
                <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-5 md:mb-7">Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        id="email"
                        type="email"
                        placeholder="Email"
                        marginClass="mb-8"
                        boxClass="md:py-5 md:rounded-4xl md:text-xl px-16"
                        divClass="md:py-5"
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
                            marginClass="mb-8"
                            boxClass="md:py-5 md:rounded-4xl md:text-xl px-16"
                            divClass="md:py-5"
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
                            className="absolute right-0 pr-6 top-[0.875rem] flex items-center cursor-pointer md:top-[1.5rem] md:pr-8"
                        >
                            <img src={Icon} 
                             alt={visible ? "Hide Password" : "Show Password"} 
                            className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <p className="text-right text-sky-950 font-semibold text-sm md:text-lg mb-4 md:mb-6 cursor-pointer">Forgot Password?</p>
                    <SubmitButton text="Login" customClass="md:py-4 md:text-2xl md:tracking-wider md:py-4 md:mb-8" />
                </form>
                <p className="font-normal text-gray-500 text-sm md:text-lg text-center py-2">Dont' have an account?
                    <Link to="/signup" className="text-sky-950 md:text-lg font-bold ml-2">Sign Up</Link>
                    </p>
            </div>
        </div>
    )
}
export default LoginPage