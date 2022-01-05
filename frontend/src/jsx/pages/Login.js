import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../context/AuthContext";

export default function LoginPage() {
  // const [user, setUser] = useState({});
  // const submitHandler = () => {
  //   axios.post("http://127.0.0.1:8000/jwt/create", user).then((res) => {
  //     console.log("data: ", res.data);
  //     const accessToken = res.data.access;
  //     const refreshToken = res.data.refresh;
  //     document.cookie = `token = ${accessToken}; path=/`;
  //     document.cookie = `refresh = ${refreshToken}; path=/`;
  //     history.push("/");
  //   });
  // };
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h4 className="text-center mb-4">Connecter vous</h4>
                    {/* <form action="" onSubmit={(e) => submitHandler(e)}> */}
                    <form action="" onSubmit={loginUser}>
                      <div className="form-group">
                        <label className="mb-1">
                          <strong>Nom d'utilisateur</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          // value={user.username}
                          name="username"
                          // onChange={(e) =>
                          //   setUser({ ...user, username: e.target.value })
                          // }
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1">
                          <strong>Mot de pass</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          // value={user.password}
                          name="password"
                          // onChange={(e) =>
                          //   setUser({ ...user, password: e.target.value })
                          // }
                        />
                      </div>
                      <div className="form-row d-flex justify-content-between mt-4 mb-2">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox ml-1">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="basic_checkbox_1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Remember my preference
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <Link to="/page-forgot-password">
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      <div className="text-center">
                        <input type="submit" />
                        {/* <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={submitHandler}
                      >
                        Sign me in
                      </button> */}
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p>
                        Don't have an account?{" "}
                        <Link className="text-primary" to="/page-register">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// };
