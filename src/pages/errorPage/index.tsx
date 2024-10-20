import { useNavigate } from "react-router-dom";
import "./index.css";
export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <h1>¡Oops, esta ruta no existe!</h1>
      <button className="product__button" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};
