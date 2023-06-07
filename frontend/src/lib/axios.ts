import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API_URL as string;
axios.defaults.headers["Authorization"] =
  "Bearer " + localStorage.getItem("token");
