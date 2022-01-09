import { useState, useEffect, useContext } from "react";
import axios from "axios";
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
import AuthContext from "../context/AuthContext";

export const useGetAPI = (endpoint) => {
  const [data, setDdata] = useState([]);
  let { authTokens } = useContext(AuthContext);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "JWT " + authTokens.access,
    },
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(endpoint, config);
    setDdata(response.data);
  };
  return data;
};

export const usePostAPI = async (endpoint, postData) => {
  let { authTokens } = useContext(AuthContext);
  console.log(authTokens);
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: "JWT " + authTokens.access,
  //     },
  //   };
  await axios.post(endpoint, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "JWT " + authTokens.access,
    },
  });
};

export const usePutAPI = async (endpoint, newData) => {
  await axios.put(endpoint, newData);
};

export const useDeleteAPI = async (endpoint, newData) => {
  await axios.delete(endpoint);
};
