import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/auth/ProfilePage";
import ForumPage from "./pages/auth/ForumPage";
import LoginPage from "./pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "account", element: <ProfilePage /> },
      { path: "forum", element: <ForumPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
