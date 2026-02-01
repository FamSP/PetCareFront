import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import PetSitterDetail from "../pages/PetSitterDetail";
import JobRequests from "../pages/JobRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "pet-sitter/:id", element: <PetSitterDetail /> },
      { path: "job-requests", element: <JobRequests /> },
    ],
  },
]);

export default router;
