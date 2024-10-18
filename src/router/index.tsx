import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main";
import { ProductPage } from "../pages/productPage";
import { useParams } from "react-router-dom";

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
  },
  {
    path: "/products/:id/:brand/:model",
    element: <ProductPageWrapper />,
  },
]);

export default router;
