import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { amIAdmin } from "../../app/slices/userSlice";

// eslint-disable-next-line react/prop-types
export const AdminRoute = ({ Component }) => {
  const isAdmin = useSelector(amIAdmin);

  return isAdmin ? <Component /> : <Navigate to="/" />;
};
