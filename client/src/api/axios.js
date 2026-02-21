import axios from "axios";

const API = axios.create({
  baseURL: "https://real-time-expert-session-booking-system-7jo1.onrender.com/api"
});

export default API;