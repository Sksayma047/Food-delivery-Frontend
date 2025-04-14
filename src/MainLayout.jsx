import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";

const MainLayout = ({ setShowLogin, showLogin, LoginPopup }) => {
  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  LoginPopup: PropTypes.elementType.isRequired, // agar aap ek component pass kar rahe ho
};

export default MainLayout;
