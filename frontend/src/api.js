import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://resume-data-manager.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
});

export default api;
