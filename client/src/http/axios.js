import axios from "axios";


export const API_URL = process.env.REACT_APP_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const lastRequest = error.config;

    if (error.response.status === 401) {
      try {
        const response = await axios.get(`${API_URL}/api/user/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(lastRequest);
      } catch (e) {
        console.log("Пользователь не авторизован");
      }
    }
    else {
      throw error
    }
  }
);

export default $api;
