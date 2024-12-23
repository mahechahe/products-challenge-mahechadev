import { lazy } from "react";

/* Rutas para usuarios autenticados */
export const routes = [
  {
    path: "",
    component: lazy(() => import("./Products/Products")),
  },
  {
    path: "404",
    component: lazy(() => import("./404/Error404Page")),
  },
];
