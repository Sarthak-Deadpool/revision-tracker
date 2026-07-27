import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

function PublicRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
    </Route>
  );
}

export default PublicRoutes;