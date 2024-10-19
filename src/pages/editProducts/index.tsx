import { useEffect, useRef, useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { useQueryContext } from "../../utils/context";
import "./index.css";
import { Product, ProductCardEditable } from "../../components/products";
import { fetchAllProducts, fetchFilteredProducts } from "../../utils/fetch";

export const EditProducts = () => {
  const { handleSearch, handleSearchFilters, combinedQuery } =
    useQueryContext();
  const [products, setProducts] = useState<Product[]>([]);
  const asideRef = useRef<any>(null);

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

  useEffect(() => {
    fetchProducts();
  }, [combinedQuery]);

  return (
    <>
      <Header onSearch={handleSearch} />

      <div className="container">
        <Aside ref={asideRef} onQueryChange={handleSearchFilters} />
        <div>
          <div className="admin-header">
            <h1>Editar Productos</h1>
            <h4>Vista administrador</h4>
          </div>
          <div className="product-container">
            {products.length > 0
              ? products.map((product) => (
                  <ProductCardEditable
                    onRemove={async () => await fetchProducts()}
                    key={`${product.id}${product.brand.id}${product.model}`}
                    product={product}
                  />
                ))
              : "No hay productos"}
          </div>
        </div>
      </div>
    </>
  );
};
