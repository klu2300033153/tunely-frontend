import axios from "axios";

const API_URL = "http://localhost:8083/tunelyback/auth"; // Your backend URL

const BACKEND_CONNECT = true; // false = use mock, true = call real backend

// Mock login response JSON
const mockLoginResponse = {
  token: "mock-jwt-token-1234567890",
  user: {
    id: 1,
    username: "mockuser",
    email: "mockuser@example.com",
  },
};

export const login = async (username, password) => {
  if (!BACKEND_CONNECT) {
    if (username === "test" && password === "test") {
      localStorage.setItem("token", mockLoginResponse.token);
      return mockLoginResponse;
    } else {
      throw new Error("Invalid credentials!");
    }
  }

  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data.token || response.data);
  return response.data;
};

export const signup = async (username, email, password) => {
  if (!BACKEND_CONNECT) {
    return { message: "Mock signup successful" };
  }

  return axios.post(`${API_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
};
