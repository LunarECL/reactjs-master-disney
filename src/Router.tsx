import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Detail from "./pages/Detail.tsx";

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
      {
        path: "character/:id",
        element: <Detail />,
        errorElement: <h1>Detail page crashed</h1>,
      },
    ],
  },
]);

export default router;
