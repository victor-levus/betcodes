import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import router from "./routes";
import { AppContext } from "./context/ProductContext";
import { getBets } from "./services/betsService";
import "./App.scss";

function App() {
  const [betData, setBetData] = useState("");
  // const [betCodeData, setBetCodeData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await getBets();

      setBetData(data);
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <AppContext.Provider value={{ betData }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}
export default App;
