import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*App /> 대신 RouterProvider를 넣고, 위에 가져온 router를 주입*/}
    <RouterProvider router={router} />
  </StrictMode>,
);
