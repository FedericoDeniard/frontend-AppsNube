import { useState, forwardRef, useImperativeHandle } from "react";
import "./index.css";

type AsideProps = {
  onQueryChange: (query: string) => void;
};

export const Aside = forwardRef(({ onQueryChange }: AsideProps, ref) => {
  const brands = ["Nike", "Adidas", "Fila", "Lacoste", "Ralph Lauren"];
  const products = ["Remera", "Pantalon", "Zapatilla", "Sweater"];
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCheckedBrands([]);
      setCheckedProducts([]);
      onQueryChange("");
    },
  }));

  const handleCheckboxChange = (type: "brand" | "product", value: string) => {
    if (type === "brand") {
      setCheckedBrands((prev) => {
        const updatedBrands = prev.includes(value)
          ? prev.filter((b) => b !== value)
          : [...prev, value];

        const updatedQuery = getCombinedQuery(updatedBrands, checkedProducts);
        onQueryChange(updatedQuery);
        return updatedBrands;
      });
    } else if (type === "product") {
      setCheckedProducts((prev) => {
        if (prev.includes(value)) {
          onQueryChange("");
          return [];
        } else {
          onQueryChange(getCombinedQuery(checkedBrands, [value]));
          return [value];
        }
      });
    }
  };

  const getCombinedQuery = (brands: string[], products: string[]) => {
    const queries: string[] = [];

    if (brands.length) {
      queries.push(`brand=${brands.join(",")}`);
    }

    if (products.length) {
      queries.push(`name=${products.join(",")}`);
    }

    return queries.length ? `${queries.join("&")}` : "";
  };

  return (
    <aside className="aside">
      <div className="aside__filters">
        <h3>Marcas</h3>
        {brands.map((brand) => (
          <label className="custom-checkbox" key={brand}>
            <input
              type="checkbox"
              checked={checkedBrands.includes(brand)}
              onChange={() => handleCheckboxChange("brand", brand)}
            />
            <span className="checkmark" />
            {brand}
          </label>
        ))}

        <h3>Productos</h3>
        {products.map((product) => (
          <label className="custom-checkbox" key={product}>
            <input
              type="checkbox"
              checked={checkedProducts.includes(product)}
              onChange={() => handleCheckboxChange("product", product)}
            />
            <span className="checkmark" />
            {product}
          </label>
        ))}
      </div>
    </aside>
  );
});
