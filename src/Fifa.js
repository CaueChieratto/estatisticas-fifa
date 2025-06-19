import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageForAllTeams from "./pages/pageForAllTeams/PageForAllTeams";
import PageForTeams from "./pages/pageForTeams/PageForTeams";
import Login from "./pages/login/login";
import PageForPlayer from "./pages/PageForPlayer/PageForPlayer";

const router = createBrowserRouter([
  { path: "/", element: <Login></Login> },
  { path: "/PageForAllTeams", element: <PageForAllTeams></PageForAllTeams> },
  {
    path: "/PageForTeams",
    element: <PageForTeams></PageForTeams>,
  },
  {
    path: "/PageForPlayer/:playerName",
    element: <PageForPlayer></PageForPlayer>,
  },
]);

export default function Fifa() {
  return <RouterProvider router={router}></RouterProvider>;
}
