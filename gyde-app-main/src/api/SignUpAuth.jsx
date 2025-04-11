import api from "../api/api"; // Import your Axios instance

export const signUpUser = async (data) => {
    try {
        const response = await api.post("/auth/register", data);
        return response.data;
    } catch (error) {
        console.error("Signup error:", error.response ? error.response.data : error.message);
        throw error;
    }
};
