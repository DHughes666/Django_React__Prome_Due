import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosService from "../helpers/axios";

const useUserActions = () => {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL

    // Login the user
    const login = (data) => {
        return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        })
    }

    const register = (data) => {
        return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        })
    }

      // Edit the user
  const edit = (data, userId) => {
    return axiosService
      .patch(`${baseURL}/user/${userId}/`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Registering the account in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: getAccessToken(),
            refresh: getRefreshToken(),
            user: res.data,
          })
        );
      });
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}/auth/logout/`, { refresh: getRefreshToken() })
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/login");
      });
  }


    

    return {
        login,
        register,
        logout,
        edit,
    };
}

// Get the user
const getUser = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.user;
}

// Get the access token
const getAccessToken = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.access;
}

// Get the refresh token
const getRefreshToken = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}

// Set the access, token and user property
const setUserData = (data) => {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,            
        })
    )
}

export {
    useUserActions,
    getUser,
    getRefreshToken,
    getAccessToken,
}

