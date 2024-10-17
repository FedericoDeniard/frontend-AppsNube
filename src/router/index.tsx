import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main";
import { ProductPage } from "../pages/productPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  // {
  //   path: "/product/:id",
  //   element: <ProductPage />,
  // },
]);

export default router;
