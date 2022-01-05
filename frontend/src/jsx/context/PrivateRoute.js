import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
