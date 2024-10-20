import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main";
import { ProductPage } from "../pages/productPage";
import { useParams } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { EditProducts } from "../pages/editProducts";
import { ErrorPage } from "../pages/errorPage";
import { PrivateRoute } from "../utils/privateRoute";

const ProductPageWrapper = () => {
  const { id, brand, model } = useParams();

  if (!id || !brand || !model) {
    return <div>Error: Falta información del producto.</div>;
  }

  return <ProductPage brand={brand} model={model} id={Number(id)} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:id/:brand/:model",
    element: <ProductPageWrapper />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/edit",
    element: <PrivateRoute element={<EditProducts />} />,
  },
]);

export default router;
