import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { RoutePath } from "types/routes";
import Home from "pages/Home/index";
import Login from "pages/Login";
import ManageProducts from "components/ManageProducts";
import ManageUsers from "components/ManageUsers";
import Settings from "pages/Settings";
import ManageTables from "components/ManageTables";
import { Auth } from "helpers/Auth";

const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path="/" element={<AuthenticatedRoutes />}>
        <Route path={RoutePath.HOME} element={<Home />} />
        <Route path={RoutePath.SETTINGS} element={<Settings />}>
          <Route path={RoutePath.SETTINGS_TABLES} element={<ManageTables />} />
          <Route
            path={RoutePath.SETTINGS_PRODUCTS}
            element={<ManageProducts />}
          />
          <Route path={RoutePath.SETTINGS_USERS} element={<ManageUsers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;