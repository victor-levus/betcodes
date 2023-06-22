import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import router from "./routes";
import { AppContext } from "./context/ProductContext";
import { getBets } from "./services/betsService";
import { getUser } from "./services/userService";
import { getPosts } from "./services/postServices";
import "./App.scss";

function App() {
  const [betData, setBetData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [betCodeData, setBetCodeData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await getBets();
      // const { data: users } = await getUser();
      // const { data: posts } = await getPosts();
      console.log(data);
      setBetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppContext.Provider value={{ betData, userData, postData, betCodeData }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
      <ToastContainer />
    </>
  );
}
export default App;
