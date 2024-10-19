import "./index.css";
import defaultImage from "../../assets/images/default.jpg";

import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../utils/fetch";
import { useState } from "react";

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
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) => {
  const handleRemove = async () => {
    await removeProduct({
      id: product.id,
      brand_id: product.brand.id,
      model: product.model,
    });

    onRemove();
  };

  const originalProduct = { ...product };
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isEditing, setIsEditing] = useState(false);

  const { name, img_url, brand, price } = product;

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
        <p className="product-card__description">{`${product.description}`} </p>
        <h2 className="product-card__price">{`$${price}`}</h2>
      </div>
    </div>
  );
};
