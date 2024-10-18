import { UniqueProduct } from "../pages/productPage";

export const fetchAllProducts = async () => {
  const url = `${import.meta.env.VITE_API_URL}/products`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const fetchFilteredProducts = async (query?: string) => {
  const url = `${import.meta.env.VITE_API_URL}/products/filter${query}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const fetchProduct = async (product: UniqueProduct) => {
  const url = `${import.meta.env.VITE_API_URL}/products/${product.id}/${
    product.brand
  }/${product.model}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
