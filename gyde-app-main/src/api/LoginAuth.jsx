    import api from "../api/api"; // Import your Axios instance

    export const loginUser = async (data) => {
        try {
            const response = await api.post("/auth/login", data);
            return response.data;
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            throw error;
        }
    };
