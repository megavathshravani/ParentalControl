import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

export const register = (username, password) =>
    axios.post(`${API_URL}/register`, { username, password });

export const login = (username, password) =>
    axios.post(`${API_URL}/login`, { username, password });
