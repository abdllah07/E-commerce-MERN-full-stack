import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/notFound/NotFound";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingCheckOut from "./pages/shopping-view/ShoppingCheckOut";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth/unAuthPage";
import { useSelector } from "react-redux";

function App() {




  const {isAuthenticated , user} = useSelector(state => state.auth)


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

        {/* auth */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user = {user}>
              <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user = {user}>
              <AuthLogin />
          </CheckAuth>
        } />
          <Route path="register" element={
            <CheckAuth isAuthenticated = {isAuthenticated} user = {user}>
                <AuthRegister />
            </CheckAuth>
        } />
        </Route>

        {/* admin  */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user = {user}>
            <AdminLayout />
          </CheckAuth>
      }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="products" element={<AdminProducts />} />
      </Route>

      {/* Shopping */}
      <Route path="/shopping" element={
        <CheckAuth isAuthenticated = {isAuthenticated} user = {user}>
            <ShoppingLayout />
      </CheckAuth>
      }>  
            <Route path="home" element={<ShoppingHome />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<ShoppingCheckOut/>} />
            <Route path="listing" element={<ShoppingListing />} />
        </Route>


        {/*  */}
      <Route path="*" element={<NotFound />} />
      <Route path="/unAuth-page" element={<UnAuthPage />} />



      </Routes>
    </div>
  );
}

export default App;
