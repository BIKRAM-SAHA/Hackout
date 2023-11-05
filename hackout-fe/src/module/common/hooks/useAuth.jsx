import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalstorage";
import axios from "axios";
import qs from "qs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async ({ email, password }) => {
    let data = qs.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL}/patientLogin`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUser(response.data?.data || null);
        console.log("loggedIn");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      isLoggedIn: user !== null,
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
