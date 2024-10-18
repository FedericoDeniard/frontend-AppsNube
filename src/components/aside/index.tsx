import { useState } from "react";
import "./index.css";

type AsideProps = {
  onQueryChange: (query: string) => void;
};

export const Aside = ({ onQueryChange }: AsideProps) => {
  const brands = ["Nike", "Adidas", "Fila", "Lacoste", "Ralph Lauren"];
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  const handleCheckboxChange = (brand: string) => {
    setCheckedBrands((prev) => {
      const updatedBrands = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];

      const updatedQuery = updatedBrands.length
        ? `brand=${updatedBrands.join(",")}`
        : "";

      onQueryChange(updatedQuery);
      return updatedBrands;
    });
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
              onChange={() => handleCheckboxChange(brand)}
            />
            <span className="checkmark" />
            {brand}
          </label>
        ))}
      </div>
    </aside>
  );
};
