import axios from "axios";

const apiURL = "http://greenvelvet.alwaysdata.net/bugTracker/api/";

export const login = (username, password) => {
  return axios.post(`${apiURL}/login`, {
    username,
    password,
  });
};

export const register = (username, password) => {
  return axios.post(`${apiURL}/register`, {
    username,
    password,
  });
};

export const getAllBugs = () => {
  return axios.get(`${apiURL}/register`);
};
