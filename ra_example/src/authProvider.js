import { AUTH_LOGIN } from "react-admin";

import axios from "axios";
import { AUTH_GET_PERMISSIONS } from "ra-core";
import decodeJwt from "jwt-decode";

const login = async (email, password) => {
  const login = await axios.post("http://localhost:5000/login", {
    email,
    password,
  });
  console.log("login", login);
  const { token } = login.data;

  const decodedToken = decodeJwt(token);
  console.log("token", token);
  localStorage.setItem("authToken", token);
  localStorage.setItem("roles", decodedToken.roles);
};

export const authProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return login(username, password);
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("roles");
    return role ? Promise.resolve(role) : Promise.reject();
  }
};
