import { useNavigate } from "react-router-dom";
import "./index.css";
export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <h1>¡Oops, esta ruta no existe o no estas autorizado!</h1>
      <button
        className="product__button"
        onClick={() => navigate(`/${import.meta.env.VITE_BASE_URL}`)}
      >
        Volver al inicio
      </button>
    </div>
  );
};
