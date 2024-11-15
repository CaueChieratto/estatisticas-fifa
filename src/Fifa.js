import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageForAllTeams from "./pages/pageForAllTeams/PageForAllTeams";
import PageForTeams from "./pages/pageForTeams/PageForTeams";

const router = createBrowserRouter([
  { path: "/", element: <PageForAllTeams></PageForAllTeams> },
  {
    path: "/PageForTeams",
    element: <PageForTeams></PageForTeams>,
  },
]);

export default function Fifa() {
  return <RouterProvider router={router}></RouterProvider>;
}
