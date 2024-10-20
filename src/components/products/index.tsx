import "./index.css";
import defaultImage from "../../assets/images/default.jpg";

import { useNavigate } from "react-router-dom";
import { modifyProduct, ModifyProduct, removeProduct } from "../../utils/fetch";
import { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  product_id: number;
  img_url: string;
  price: number;
  description: string;
  model: string;
  brand: {
    id: number;
    name: string;
    logo_url: string;
  };
};

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const { name, img_url, brand, price } = product;
  return (
    <div
      className="product-card"
      onClick={() =>
        navigate(`/products/${product.id}/${brand.name}/${product.model}`)
      }
    >
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={img_url}
          onError={(e) => (e.currentTarget.src = defaultImage)}
        />
        <figure className="product-card__brand">
          <img src={brand.logo_url} />
          <figcaption>{brand.name}</figcaption>
        </figure>
      </div>
      <div className="product-card__info">
        <h2 className="product-card__name">{`${name}`}</h2>
        <h2 className="product-card__price">{`$${price}`}</h2>
      </div>
    </div>
  );
};

export const ProductCardEditable = ({
  product,
  onChange,
}: {
  product: Product;
  onChange: () => void;
}) => {
  const handleRemove = async () => {
    await removeProduct({
      id: product.id,
      brand_id: product.brand.id,
      model: product.model,
    });

    onChange();
  };

  const originalProduct = { ...product };
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {}, [isEditing]);

  const saveProduct = async () => {
    const originalProductData: ModifyProduct = {
      id: originalProduct.id,
      brand_id: originalProduct.brand.id,
      model: originalProduct.model,
      img_url: originalProduct.img_url,
      price: originalProduct.price,
      description: originalProduct.description,
    };

    const editedProductData: ModifyProduct = {
      id: editedProduct.id,
      brand_id: editedProduct.brand.id,
      model: editedProduct.model,
      img_url: editedProduct.img_url,
      price: editedProduct.price,
      description: editedProduct.description,
    };

    setIsEditing(false);
    await modifyProduct({
      originalProduct: originalProductData,
      modifiedProduct: editedProductData,
    });

    onChange();
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <p
          className="product-card__edit"
          onClick={() => setIsEditing(!isEditing)}
        ></p>
        <p className="product-card__remove" onClick={handleRemove}>
          x
        </p>
        <img
          className="product-card__image"
          src={editedProduct.img_url}
          onError={(e) => (e.currentTarget.src = defaultImage)}
        />
        <figure className="product-card__brand">
          <img src={editedProduct.brand.logo_url} />
          <figcaption>{editedProduct.brand.name}</figcaption>
        </figure>
      </div>
      <div className="product-card__info">
        <h2 className="product-card__name">{`${name}`}</h2>
        {isEditing ? (
          <>
            <input
              placeholder="img-url"
              value={editedProduct.img_url}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, img_url: e.target.value })
              }
            />
            <input
              placeholder="Descripción"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </>
        ) : (
          <p className="product-card__description">{`${product.description}`}</p>
        )}
        {isEditing ? (
          <input
            placeholder="Precio"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: Number(e.target.value),
              })
            }
          />
        ) : (
          <h2 className="product-card__price">{`$${editedProduct.price}`}</h2>
        )}
        {isEditing ? (
          <>
            <p
              className="product-card__save"
              onClick={() => {
                saveProduct();
              }}
            ></p>
            <p
              className="product-card__undo"
              onClick={() => setEditedProduct(originalProduct)}
            ></p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
