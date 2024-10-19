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

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const url = `${import.meta.env.VITE_API_URL}/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

export const checkLogin = async () => {
  const url = `${import.meta.env.VITE_API_URL}/checkToken`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return { isLogged: response.ok, data };
};

export const removeProduct = async ({
  id,
  brand_id,
  model,
}: {
  id: number;
  brand_id: number;
  model: string;
}) => {
  const url = `${import.meta.env.VITE_API_URL}/removeProduct`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, brand_id, model }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove product");
  }
  const data = await response.json();
  return { data };
};

export type ModifyProduct = {
  id: number;
  brand_id: number;
  model: string;
  img_url: string;
  price: number;
  description: string;
};

export const modifyProduct = async ({
  originalProduct,
  modifiedProduct,
}: {
  originalProduct: ModifyProduct;
  modifiedProduct: ModifyProduct;
}) => {
  const url = `${import.meta.env.VITE_API_URL}/modifyProduct`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ originalProduct, modifiedProduct }),
  });

  if (!response.ok) {
    throw new Error("Failed to modify product");
  }
  const data = await response.json();
  return { data };
};
