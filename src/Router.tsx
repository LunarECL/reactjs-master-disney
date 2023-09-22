import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <h1>Home crashed</h1>,
      },
    ],
  },
]);

export default router;
