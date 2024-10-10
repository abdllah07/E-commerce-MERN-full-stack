import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/notFound/NotFound";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingCheckOut from "./pages/shopping-view/ShoppingCheckOut";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth/unAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import Orders from "./pages/admin-view/Orders";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ShoppingSearch from "./pages/shopping-view/ShoppingSearch";
import AdminClothes from "./pages/admin-view/AdminClothes";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Global Loading Animation for all pages
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner /> {/* Add your custom loading spinner here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        } />
        {/* auth */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLogin />
            </CheckAuth>
          } />
          <Route path="register" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthRegister />
            </CheckAuth>
          } />
        </Route>

        {/* admin */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>  
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="clothes" element={<AdminClothes />} />

        </Route>

        {/* Shopping */}
        <Route path="/shopping" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<ShoppingSearch />} />

        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unAuth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
