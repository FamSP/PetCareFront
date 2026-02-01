import api from "./api";

const API_URL = import.meta.env.VITE_AUTH_URL;
import TokenService from "./token.service";

const register = async (username,phone, password) => {
  return await api.post(API_URL + "/register", {
    username,
    phone,
    password,
  });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", {
    username,
    password,
  });
  const { status, data } = response;
  if (status === 200) {
    if (data?.accessToken) {
      TokenService.setUser(data);
    }
  }

  return response;
};


const logout = () => {
  TokenService.removeUser();
};

const AuthenticationService = {
  register,
  login,
  logout,
};

export default AuthenticationService;
