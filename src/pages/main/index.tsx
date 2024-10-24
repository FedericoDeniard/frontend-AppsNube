import { Header } from "../../components/header";
import { ProductCard } from "../../components/products";
import { Product } from "../../components/products";

import { useEffect, useState, useRef } from "react";
import "./index.css";
import { Aside } from "../../components/aside";
import { fetchAllProducts, fetchFilteredProducts } from "../../utils/fetch";
import { useQueryContext } from "../../utils/context";
import { Loader } from "../../components/loader";

export const MainPage = () => {
  const { combinedQuery, handleSearch, handleSearchFilters, setQuery } =
    useQueryContext();
  const [products, setProducts] = useState<Product[] | null>(null);
  const asideRef = useRef<any>(null);

  const resetFilters = () => {
    if (asideRef.current) {
      asideRef.current.reset();
    }
    setQuery({ searchQuery: "", filterQuery: "" });
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
  }, [combinedQuery]);

  return (
    <div className="mainPage">
      <Header onSearch={handleSearch} resetFilters={resetFilters} />
      <div className="container">
        <Aside ref={asideRef} onQueryChange={handleSearchFilters} />
        <div className="product-container">
          {products ? (
            products.map((product) => (
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
  );
};
