import { Route, Routes, Navigate } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import CustomerList from "./pages/CustomerList";
import Notes from "./pages/Notes";

const getUserData = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const isAuthenticated = () => {
  return getUserData() !== null;
};

const canAccessRoute = (allowedRoles) => {
  if (!isAuthenticated()) return false;
  if (allowedRoles.length === 0) return true;

  const user = getUserData();
  return allowedRoles.includes(user.role?.name);
};

const getDefaultRedirect = () => {
  if (!isAuthenticated()) return "/";

  const user = getUserData();
  const userRole = user.role?.name;

  switch (userRole) {
    case "pegawai":
      return "/customers";
    case "professional sales":
      return "/customers";
    default:
      return "/";
  }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />

      <Route
        path="/customers"
        element={
          canAccessRoute(["pegawai", "professional sales"]) ? (
            <CustomerList />
          ) : (
            <Navigate to={getDefaultRedirect()} replace />
          )
        }
      />

      <Route
        path="/sales"
        element={
          canAccessRoute(["professional sales"]) ? (
            <Notes />
          ) : (
            <Navigate to={getDefaultRedirect()} replace />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to={getDefaultRedirect()} replace />}
      />
    </Routes>
  );
}

export default App;
