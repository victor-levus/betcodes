import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { fetchBets, getBetStatus } from "./store/slices/betsSlice";
import { fetchUser, getUserStatus } from "./store/slices/userSlice";
import Home from "./pages/home/Home";
import Layout from "./global/Layout";
import AuthPage from "./pages/auth/AuthPage";
import Logout from "./pages/auth/Logout";
import BlogPage from "./pages/blog/BlogPage";
import { getSession } from "./pages/auth/auth";

export default function App() {
  const dispatch = useDispatch();
  const betStatus = useSelector(getBetStatus);
  const userStatus = useSelector(getUserStatus);

  useEffect(() => {
    if (betStatus === "idle") {
      dispatch(fetchBets());
    }
  }, [betStatus, dispatch]);

  useEffect(() => {
    getLoggedInUser();
  }, [userStatus]);

  const getLoggedInUser = async () => {
    const session = await getSession();

    if (session?.status === 200) {
      dispatch(fetchUser());
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>

        <Route path="auth">
          <Route index element={<h1>Under Construction</h1>} />
          {/* <Route index element={<AuthPage />} /> */}
          {/* <Route path="logout" element={<Logout />} /> */}
        </Route>

        <Route path="blog">
          <Route index element={<h1>Under Construction</h1>} />
          {/* <Route index element={<BlogPage />} /> */}
          {/* <Route path=":postId" element={<h1>PostID Route</h1>} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
