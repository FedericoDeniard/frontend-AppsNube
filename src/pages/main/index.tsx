import { Header } from "../../components/header";
import { ProductCard } from "../../components/products";
import { Product } from "../../components/products";

import { useEffect, useState } from "react";
import "./index.css";
import { Aside } from "../../components/aside";
import { fetchAllProducts, fetchFilteredProducts } from "../../utils/fetch";
import { useQueryContext } from "../../utils/context";

export const MainPage = () => {
  const { combinedQuery, handleSearch, handleSearchFilters } =
    useQueryContext();
  const [products, setProducts] = useState<Product[]>([]);

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
  }, [combinedQuery]);

  return (
    <div className="mainPage">
      <Header onSearch={handleSearch} />
      <div className="container">
        <Aside onQueryChange={handleSearchFilters} />
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
