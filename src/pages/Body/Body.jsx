import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import Register from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { Appointments } from "../Appointments/Appointments";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/appointments" element={<Appointments />} />
        <Route path="/admin" element={<AdminRoute Component={Admin} />} />
      </Routes>
    </>
  );
};
