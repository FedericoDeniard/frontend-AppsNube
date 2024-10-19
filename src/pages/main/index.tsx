import { Header } from "../../components/header";
import { ProductCard } from "../../components/products";
import { Product } from "../../components/products";

import { useEffect, useState, useRef } from "react";
import "./index.css";
import { Aside } from "../../components/aside";
import { fetchAllProducts, fetchFilteredProducts } from "../../utils/fetch";
import { useQueryContext } from "../../utils/context";

export const MainPage = () => {
  const { combinedQuery, handleSearch, handleSearchFilters } =
    useQueryContext();
  const [products, setProducts] = useState<Product[]>([]);
  const asideRef = useRef<any>(null);

  const resetFilters = () => {
    if (asideRef.current) {
      asideRef.current.reset();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (combinedQuery) {
          const filteredProducts = await fetchFilteredProducts(combinedQuery);
          setProducts(filteredProducts);
        } else {
          const fetchedProducts = await fetchAllProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    console.log(products);
  }, [combinedQuery]);

  return (
    <div className="mainPage">
      <Header onSearch={handleSearch} resetFilters={resetFilters} />
      <div className="container">
        <Aside ref={asideRef} onQueryChange={handleSearchFilters} />
        <div className="product-container">
          {products.length > 0
            ? products.map((product) => (
                <ProductCard
                  key={`${product.id}${product.brand.id}${product.model}`}
                  product={product}
                />
              ))
            : "No hay productos"}
        </div>
      </div>
    </div>
  );
};
