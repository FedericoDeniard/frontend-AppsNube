import { ErrorPage } from "../../pages/errorPage";
import { useQueryContext } from "../context";
import { ReactNode } from "react";

interface PrivateRouteProps {
  element: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { logged } = useQueryContext();

  return logged ? element : <ErrorPage />;
};
