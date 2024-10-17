import "./index.css";

import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { Product } from "../../components/products";
import { fetchAllProducts } from "../../utils/fetch";

export const ProductPage = (id: number) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProduct = await fetchAllProducts();
        setProducts(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // La depende
  return (
    <div className="mainPage">
      <Header onSearch={() => {}} />
    </div>
  );
};
