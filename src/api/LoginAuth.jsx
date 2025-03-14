import axios from "axios";

const API_URL =  "https://jsonplaceholder.typicode.com/posts";

export const loginUser = async(data) => {
    try {
        const response = await axios.post(`${API_URL}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Login error", error.response ? error.response.data : error.message);
        throw error;
    }
}