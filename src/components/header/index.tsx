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

  const { logged, checkLogged } = useQueryContext();

  useEffect(() => {
    checkLogged();
  }, [logged]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${import.meta.env.VITE_BASE_URL}`);
    }
    onSearch(searchTerm);
  };

  const resetSearchTerm = () => {
    onSearch("");
    navigate(`/${import.meta.env.VITE_BASE_URL}`);
    setSearchTerm("");
  };

  return (
    <header className="header">
      <div
        className="logo-container"
        onClick={() => {
          resetSearchTerm();
          resetFilters;
        }}
      >
        <img
          src={`/${import.meta.env.VITE_BASE_URL}logo.svg`}
          alt="logo"
          className="logo"
        />
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
      <div className="button-container">
        {!logged ? (
          <button
            className="profile-button"
            onClick={async () => {
              await checkLogged();
              navigate(`/${import.meta.env.VITE_BASE_URL}login`);
            }}
          />
        ) : (
          <button
            className="profile-button"
            onClick={async () => {
              await checkLogged();
              navigate(`/${import.meta.env.VITE_BASE_URL}edit`);
            }}
          />
        )}
        <button className="cart-button" />
      </div>
    </header>
  );
};
