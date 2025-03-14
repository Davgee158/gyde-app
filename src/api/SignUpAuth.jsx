import axios from "axios";

const SIGNUP_API_URL = "https://jsonplaceholder.typicode.com/posts";

export const signUpUser = async(data) => {
    try{
        const response = await axios.post(SIGNUP_API_URL, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data;
    } catch(error) {
        console.error("Signup error", error.response ? error.response.data : error.message);
        throw error;
    }
}