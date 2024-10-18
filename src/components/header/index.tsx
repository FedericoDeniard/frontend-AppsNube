import { useState } from "react";
import "./index.css";

export const Header = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={resetSearchTerm}>
        <img src="/logo.svg" alt="logo" className="logo" />
        <h1>Tienda Vite</h1>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button" />
      </form>
      <button className="cart-button" />
    </header>
  );
};
