import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { useQueryContext } from "../../utils/context";
import { login } from "../../utils/fetch";
import "./index.css";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
  repeatPassword: string;
};

export const LoginPage = () => {
  const { handleSearch } = useQueryContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    await login({
      username: data.username,
      password: data.password,
    });
    navigate(`/${import.meta.env.VITE_BASE_URL}`);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="login-page">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* No valido las contraseñas y usuario porque hay solo un administrador, no es posible registrarse */}
          <input
            className="input"
            type="text"
            {...register("username", { required: true })}
            autoComplete="off"
            placeholder="Usuario"
          />
          <input
            className="input"
            type="password"
            {...register("password", { required: true })}
            autoComplete="off"
            placeholder="Contraseña"
          />
          <input
            className="input"
            type="password"
            {...register("repeatPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            autoComplete="off"
            placeholder="Repetir contraseña"
          />
          {errors.repeatPassword && (
            <p className="error">Las contraseñas no coinciden</p>
          )}
          <input
            className="login-button"
            value="Iniciar sesión"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};
