import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
    baseURL: "http://localhost:8081",
  
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  client.interceptors.response.use(
    (response) => {
      console.log("Client Response =>", response);
      return response;
    },
  
    (error) => {
      console.log("err", error);
      if (401 === error?.response?.status) {
        Cookies.remove("token");
  
        clearToken();
        localStorage.clear();
        window.location.replace("/login");
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  export const syncToken = () => {
    client.defaults.headers["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`; 
  };
  
  export const clearToken = () => {
    delete client.defaults.headers["Authorization"];
  };
  
  export default client;