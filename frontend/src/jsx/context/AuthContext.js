import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { set } from "js-cookie";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  let [username, setUsername] = useState(() =>
    localStorage.getItem("username") ? localStorage.getItem("username") : null
  );

  let history = useHistory();
  let loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch("http://127.0.0.1:8000/jwt/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log("user is loggedin");
      let usersListResp = await fetch("http://127.0.0.1:8000/users_list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + data.access,
        },
      });
      let usersList = await usersListResp.json();
      let user_id = jwt_decode(data.access)["user_id"];

      console.log("users are: ", usersList);
      console.log("user is: ", jwt_decode(data.access)["user_id"]);
      let activeUser = usersList.filter((element) => element["id"] == user_id);
      let activeUsername = activeUser[0]["username"];
      setUsername(activeUsername);
      console.log("active activeUsername is: ", activeUsername);
      localStorage.setItem("username", activeUsername);
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setUsername("");
    localStorage.removeItem("authTokens");
    localStorage.removeItem("username");
    history.push("/");
  };

  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    username: username,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};
