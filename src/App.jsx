import { useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import AdminLayout from "./admin/AdminLayout";
import Add from "../src/admin/pages/Add/Add";
import List from "../src/admin/pages/List/List";
import Users from "./admin/pages/Users/User";
import Orders from "../src/admin/pages/Orders/Orders";
import "./index.css";

import MainLayout from "./MainLayout";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              LoginPopup={LoginPopup}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="verify" element={<Verify />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
