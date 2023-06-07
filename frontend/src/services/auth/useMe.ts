import { useQuery } from "react-query";
import axios from "axios";

const getUser = async () => await axios.get("/me");

export const useUser = () => {
  useQuery("me", getUser);
};
