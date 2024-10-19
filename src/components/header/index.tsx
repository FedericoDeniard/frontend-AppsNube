import { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useQueryContext } from "../../utils/context";

export const Header = ({
  onSearch,
  resetFilters,
}: {
  onSearch: (searchTerm: string) => void;
  resetFilters?: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setQuery, logged, checkLogged } = useQueryContext();

  useEffect(() => {
    checkLogged();
  }, [logged]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    onSearch(searchTerm);
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
    onSearch("");
    navigate("/");
    setQuery({ searchQuery: "", filterQuery: "" });
  };

  return (
    <header className="header" onClick={resetFilters}>
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
      {!logged ? (
        <button
          className="profile-button"
          onClick={async () => {
            await checkLogged();
            navigate("/login");
          }}
        />
      ) : (
        <button
          className="profile-button"
          onClick={async () => {
            await checkLogged();
            navigate("/edit");
          }}
        />
      )}
    </header>
  );
};
