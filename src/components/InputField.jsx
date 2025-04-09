import React from "react";

const InputField = ({ id, type, placeholder, registerProps, errorMessage, icon, containerClass, marginClass="mb-6 md:mb-7", divClass, boxClass, ...rest }) => {
    return (
        <div className={`${marginClass} relative ${containerClass}`}>
                        <label htmlFor={id} className="sr-only">{placeholder}</label>
                        {icon && (
                            <div className={`absolute pt-3 pl-6 flex items-center pointer-events-none ${divClass}`}>
                                {icon}
                            </div>
                        )}
                        <input 
                        type={type}
                        {...registerProps}
                        id={id} 
                        className={`w-full px-14 py-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-200 placeholder-gray-500 custom-input ${boxClass}`}
                        {...rest} 
                        placeholder={placeholder} 
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-3 pl-3">{errorMessage}</p>
                            )}
                    </div>
    )
}

export default InputField;