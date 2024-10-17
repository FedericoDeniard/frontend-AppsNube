import { Header } from "../../components/header";
import { ProductCard } from "../../components/products";
import { Product } from "../../components/products";

import { useEffect, useState } from "react";
import "./index.css";
import { Aside } from "../../components/aside";
import { fetchAllProducts, fetchFilteredProducts } from "../../utils/fetch";

export const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<{
    searchQuery: string;
    filterQuery: string;
  }>({
    searchQuery: "",
    filterQuery: "",
  });

  const handleSearch = async (searchQuery: string) => {
    const updatedSearchQuery = searchQuery ? `name=${searchQuery}` : "";

    const finalQuery = {
      searchQuery: updatedSearchQuery,
      filterQuery: query.filterQuery,
    };

    const combinedQuery =
      finalQuery.searchQuery || finalQuery.filterQuery
        ? `?${finalQuery.searchQuery}${
            finalQuery.filterQuery ? `&${finalQuery.filterQuery.slice(1)}` : ""
          }`
        : "";

    setQuery(finalQuery);
    const filteredProducts = await fetchFilteredProducts(combinedQuery);
    setProducts(filteredProducts);
  };

  const handleSearchFilters = async (filterQuery: string) => {
    const finalQuery = {
      searchQuery: query.searchQuery,
      filterQuery: filterQuery,
    };

    const combinedQuery =
      finalQuery.searchQuery || finalQuery.filterQuery
        ? `?${finalQuery.searchQuery}${
            finalQuery.filterQuery ? `&${finalQuery.filterQuery.slice(1)}` : ""
          }`
        : "";

    setQuery(finalQuery);
    const filteredProducts = await fetchFilteredProducts(combinedQuery);
    setProducts(filteredProducts);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="mainPage">
      <Header onSearch={handleSearch} />
      <div className="container">
        <Aside onQueryChange={handleSearchFilters} />
        <div className="product-container">
          {products.length > 0
            ? products.map((product) => (
                <ProductCard
                  key={`${product.id}${product.brand.id}`}
                  product={product}
                />
              ))
            : "No hay productos"}
        </div>
      </div>
    </div>
  );
};
