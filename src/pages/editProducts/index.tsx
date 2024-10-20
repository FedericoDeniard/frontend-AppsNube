import { useEffect, useRef, useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { useQueryContext } from "../../utils/context";
import "./index.css";
import { Product, ProductCardEditable } from "../../components/products";
import {
  createBrand,
  createNewProduct,
  fetchAllProducts,
  fetchFilteredProducts,
} from "../../utils/fetch";
import { useForm } from "react-hook-form";

export type formType = {
  name: string;
  brand_name: string;
  product_brand: productBrand;
};

export type productBrand = {
  model: string;
  img_url: string;
  price: number;
  description: string;
};

export type formBrandType = {
  name: string;
  logo_url: string;
};

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formType>();

  const onSubmit = async (data: formType) => {
    const response = await createNewProduct(data);

    if (response.data) {
      alert("Producto creado exitosamente");
      reset();
    } else {
      alert("Error al crear el producto");
    }

    fetchProducts();
  };

  const {
    register: registerBrand,
    handleSubmit: handleSubmitBrand,
    reset: resetBrand,
    formState: { errors: errorsBrand },
  } = useForm<formBrandType>();

  const onBrandSubmit = async (data: formBrandType) => {
    const response = await createBrand(data);

    if (response.data) {
      alert("Marca creada exitosamente");
      resetBrand();
    } else {
      alert("Error al crear la marca");
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />

      <div className="container">
        <Aside ref={asideRef} onQueryChange={handleSearchFilters} />
        <div>
          <div className="admin-header">
            <h1>Editar Productos</h1>
            <h4>Vista administrador</h4>
            <div className="create">
              <form onSubmit={handleSubmit(onSubmit)} className="product-form">
                <h3>Crear nuevo producto</h3>
                <p>
                  Todos los campos son obligatorios <br />
                  La marca debe existir antes de ser creado el producto
                </p>
                <input
                  className="input"
                  {...register("name", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="Nombre del producto"
                  autoCapitalize="true"
                />
                {errors.name && <p className="error">El nombre es requerido</p>}
                <input
                  className="input"
                  {...register("brand_name", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="Marca del producto"
                  autoCapitalize="true"
                />
                {errors.brand_name && (
                  <p className="error">La marca es requerida</p>
                )}
                <input
                  className="input"
                  {...register("product_brand.model", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="Modelo del producto"
                  autoCapitalize="true"
                />
                {errors.product_brand && (
                  <p className="error">El modelo es requerido</p>
                )}
                <input
                  className="input"
                  {...register("product_brand.img_url", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="URL de la imagen"
                  autoCapitalize="true"
                />
                {errors.product_brand && (
                  <p className="error">La imagen es requerida</p>
                )}
                <input
                  className="input"
                  {...register("product_brand.price", { required: true })}
                  type="number"
                  autoComplete="off"
                  placeholder="Precio del producto"
                  autoCapitalize="true"
                />
                {errors.product_brand && (
                  <p className="error">El precio es requerido</p>
                )}
                <input
                  className="input"
                  {...register("product_brand.description", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="Descripción del producto"
                  autoCapitalize="true"
                />
                {errors.product_brand && (
                  <p className="error">La descripción es requerida</p>
                )}
                <button type="submit" className="login-button">
                  Crear
                </button>
              </form>
              <form
                className="product-form"
                onSubmit={handleSubmitBrand(onBrandSubmit)}
              >
                <h3>Crear nueva marca</h3>
                <p>
                  Todos los campos son obligatorios <br />
                </p>
                <input
                  className="input"
                  {...registerBrand("name", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="Nombre de la marca"
                  autoCapitalize="true"
                />
                {errorsBrand.name && (
                  <p className="error">El nombre es requerido</p>
                )}
                <input
                  className="input"
                  {...registerBrand("logo_url", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="URL de la imagen"
                />
                {errorsBrand && <p className="error">La imagen es requerida</p>}
                <button type="submit" className="login-button">
                  Crear
                </button>
              </form>
            </div>
          </div>
          <div className="product-container">
            {products.length > 0
              ? products.map((product) => (
                  <ProductCardEditable
                    onChange={async () => await fetchProducts()}
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
