import "./index.css";

import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { Product, ProductCard } from "../../components/products";
import { fetchProduct } from "../../utils/fetch";

export type UniqueProduct = {
  id: number;
  brand: string;
  model: string;
};

export const ProductPage = ({ id, brand, model }: UniqueProduct) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProduct = await fetchProduct({ id, brand, model });
        setProduct(fetchedProduct[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id, brand, model]);

  return (
    <div className="mainPage">
      <Header onSearch={() => {}} />
      <div className="singleProduct-container">
        <figure>
          <img
            className="singleProduct-image"
            src={product?.img_url}
            alt={`${product?.name} ${product?.brand.name} ${product?.model} ${product?.description}`}
          />
        </figure>
        <div className="singleProduct-info">
          <h1>
            {`${product?.name} ${product?.brand.name}`}{" "}
            <img className="brand-logo" src={product?.brand.logo_url} />
          </h1>
          <h2>{`Modelo: ${product?.model}`}</h2>
          <h3>{`${product?.description} - $${product?.price}`}</h3>
        </div>
      </div>

      {/* {product !== null ? <ProductCard product={product} /> : <></>} */}
    </div>
  );
};
