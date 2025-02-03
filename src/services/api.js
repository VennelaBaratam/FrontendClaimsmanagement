import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";  // ✅ Backend URL
const API_KEY = process.env.REACT_APP_API_KEY; // ✅ Load API key from .env

// Ensure API key exists
if (!API_KEY) {
    console.error("❌ ERROR: API Key is missing. Make sure you have REACT_APP_API_KEY in your .env file.");
}

// ✅ Create an Axios instance with API key in the x-api-key header
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'x-api-key': API_KEY,  // ✅ API Key included in x-api-key header
        'Content-Type': 'application/json'  // ✅ Correct Content-Type header
    }
});

export default api;
