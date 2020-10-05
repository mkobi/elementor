import axios from "axios";
import settings from "../config/settings";

const SERVER_URL = settings?.serverUrl;
const HEADERS = {
  "Content-Type": "application/json",
};

export async function login(data: any) {
  return axios.post(`${SERVER_URL}/login`, data, {
    validateStatus: (status) => status === 200,
    headers: HEADERS,
  });
}

export async function register(data: any) {
  return axios.post(`${SERVER_URL}/register`, data, {
    validateStatus: (status) => status === 200,
    headers: HEADERS,
  });
}

export async function logout(data: any) {
  return axios.post(`${SERVER_URL}/logout`, data, {
    validateStatus: (status) => status === 200,
    headers: HEADERS,
  });
}

export async function onlineUsers() {
  return axios.get(`${SERVER_URL}/onlineUsers`, {
    validateStatus: (status) => status === 200,
    headers: HEADERS,
  });
}

export async function getUserData(sessionId: string) {
  return axios.get(`${SERVER_URL}/getSessionData/${sessionId}`, {
    validateStatus: (status) => status === 200,
    headers: HEADERS,
  });
}
