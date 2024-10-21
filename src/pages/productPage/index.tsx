import "./index.css";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { Product, ProductCard } from "../../components/products";
import { fetchFilteredProducts, fetchProduct } from "../../utils/fetch";
import { useQueryContext } from "../../utils/context";
import { Loader } from "../../components/loader";

export type UniqueProduct = {
  id: number;
  brand: string;
  model: string;
};

export const ProductPage = ({ id, brand, model }: UniqueProduct) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [brandProducts, setBrandProducts] = useState<Product[] | null>(null);
  const { handleSearch } = useQueryContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProduct = await fetchProduct({ id, brand, model });
        setProduct(fetchedProduct[0]);
        const otherProducts = await fetchFilteredProducts(`?brand=${brand}`);
        setBrandProducts(otherProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id, brand, model]);

  return (
    <div className="mainPage">
      <Header onSearch={handleSearch} />

      {product ? (
        <div className="product">
          <figure className="product__image-container">
            <img
              className="product__image"
              src={product?.img_url}
              alt={`${product?.name} ${product?.brand.name} ${product?.model} ${product?.description}`}
            />
          </figure>
          <div className="product__info">
            <h1 className="product__name">
              {`${product?.name} ${product?.brand.name}`}
              <img
                className="product__brand-logo"
                src={product?.brand.logo_url}
              />
            </h1>
            <h2 className="product__model">{`Modelo: ${product?.model}`}</h2>
            <h3 className="product__description">{`${product?.description} - $${product?.price}`}</h3>
            <button className="product__button">Comprar</button>
            <p>También te podría interesar</p>
            <div className="one-product-container">
              {brandProducts ? (
                brandProducts
                  .filter((otherProduct) => otherProduct.id !== id)
                  .map((product) => (
                    <ProductCard
                      key={`${product.id}${product.brand.id}${product.model}`}
                      product={product}
                    />
                  ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
