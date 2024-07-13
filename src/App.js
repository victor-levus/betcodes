import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { fetchBets, getBetStatus } from "./store/slices/betsSlice";
import {
  fetchUser,
  fetchUsers,
  getUsersStatus,
  getUserStatus,
} from "./store/slices/userSlice";
import Home from "./pages/home/Home";
import Layout from "./global/Layout";
import AuthPage from "./pages/auth/AuthPage";
import Logout from "./pages/auth/Logout";
import BlogPage from "./pages/blog/BlogPage";
import { loginWithToken } from "./pages/auth/auth";
import Playground from "./pages/playground/playground";
import { fetchPosts, getPostStatus } from "./store/slices/postSlice";
import AdminDashboard from "./pages/admin/Dashboard";
import BetsPage from "./pages/admin/bets/BetsPage";
import UsersPage from "./pages/admin/users/UsersPage";
import TeamsAnalysis from "./pages/admin/teamsAnalysis/TeamAnalysis";
import AdminLayout from "./pages/admin/AdminLayout";

export default function App() {
  const dispatch = useDispatch();
  const betStatus = useSelector(getBetStatus);
  const postStatus = useSelector(getPostStatus);
  const usersStatus = useSelector(getUsersStatus);

  useEffect(() => {
    if (betStatus === "idle") {
      dispatch(fetchBets());
    }
  }, [betStatus, dispatch]);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("running");
  }, [dispatch]);

  const getLoggedInUser = async () => {
    const session = await loginWithToken();

    if (session) {
      dispatch(fetchUser());
    } else {
      console.log("Could not login");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/playground/:geoImage" element={<Playground />}></Route>

        <Route path="auth">
          {/* <Route index element={<h1>Under Construction</h1>} /> */}
          <Route index element={<AuthPage />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="blog">
          {/* <Route index element={<h1>Under Construction</h1>} /> */}
          <Route index element={<BlogPage />} />
          <Route path=":postId" element={<h1>PostID Route</h1>} />
        </Route>

        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bets" element={<BetsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="teamanalysis" element={<TeamsAnalysis />} />
        </Route>
      </Route>
    </Routes>
  );
}
