import axios from "axios";

const instance = axios.create({
  baseURL: "https://grocery-ghandour-default-rtdb.firebaseio.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
