import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./routes";
import { AppContext } from "./context/ProductContext";
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppContext.Provider value={{ betData, userData, postData, betCodeData }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}
export default App;
