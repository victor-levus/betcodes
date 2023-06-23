import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "./routes";
import { AppContext } from "./context/ProductContext";
import { getBets } from "./services/betsService";
import { getPosts } from "./services/postServices";
import authService from "./services/authService";
import "./App.scss";

function App() {
  const [betData, setBetData] = useState("");
  const [userData, setUserData] = useState("");
  const [postData, setPostData] = useState([]);
  const [betCodeData, setBetCodeData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await getBets();
      const user = await authService.getCurrentUser();
      const result = await getPosts();

      setBetData(data);

      setUserData(user);

      if (!result.data) return;
      setPostData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <AppContext.Provider value={{ betData, userData, postData, betCodeData }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}
export default App;
