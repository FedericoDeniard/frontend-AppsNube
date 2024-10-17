// export const fetchProducts = async (query?: string) => {
//   const url = `${import.meta.env.VITE_API_URL}/products${
//     query ? `${query}` : ""
//   }`;
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await response.json();
//   return data;
// };

// export const fetchFilteredProducts = async (query?: string) => {
//   const url = `${import.meta.env.VITE_API_URL}/products/${query}`;
//   console.log(url);
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await response.json();
//   return data;
// };

// export const fetchProduct = async () => {
//   const url = `${import.meta.env.VITE_API_URL}/products/:id`;
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await response.json();
//   return data;

// }

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
