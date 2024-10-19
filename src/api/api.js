import axios from "axios";

const API_URL = "http://localhost:3000";

// Save JWT Token in localStorage
export const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

// Get JWT Token from localStorage
const getToken = () => localStorage.getItem("jwtToken");

// get logged in status
export const isLoggedIn = () => {
  return getToken() !== null;
};

// Axios instance with authorization header
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the token to request headers
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Requests
export const login = (email, password) => {
  return apiClient.post("/users/login", { email, password });
};

export const signup = (email, password) => {
  return apiClient.post("/users", { email, password });
};

export const createBook = (book) => {
  return apiClient.post("/books", book);
};

export const createBorrowRequest = (bookId) => {
  return apiClient.post("/exchanges/borrow", { bookId });
};

export const getMyRequests = () => {
  return apiClient.get("/exchanges/my-requests");
};

export const getIncomingRequests = () => {
  return apiClient.get("/exchanges/incoming-requests");
};

export const acceptRequest = async (requestId) => {
  return await apiClient.patch(`/exchanges/${requestId}/accept`);
};

export const rejectRequest = async (requestId) => {
  return await apiClient.patch(`/exchanges/${requestId}/reject`);
};
