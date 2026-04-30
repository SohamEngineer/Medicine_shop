import React from "react";
import { FaUser, FaHeart, FaShoppingBag, FaSearch, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";
import useGetItem from "../hooks/useGetItem";
import { useAuth } from "../utils/contextapi.jsx";

const PharmaCare = () => {
  const { render } = useGetItem();
  const { user, auth } = useAuth(); // Get user and logout function
  const location = useLocation(); // To track active routes

  return (
    <div className="pharmacare-container">
      <header className="header">
        <div className="logo"><img src="/image/image.png" alt="Logo" /></div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button><FaSearch /></button>
        </div>
        <div className="header-icons">
          {user ? (
            <>
              <span className="icon" style={{marginTop:"10px"}}>👤 {user.name}</span>
              <button onClick={auth.logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="icon2" style={{ color: "black" }}>
              <FaUser /> <span  >Account</span>
            </Link>
          )}
          <div className="ico" style={{ color: "black",  marginLeft:"10px"}}><FaHeart /> <span>Wishlist</span></div>
          <Link to="/addtocart" className="cart"> 🛒 <span className="cart-badge"></span></Link>
        </div>
      </header>

      <nav className="navbar">
        <button className="menu-btn">
          <FaBars /> Browse Categories
        </button>
        <ul>
          <div>
            <Link to="/" className={location.pathname === "/" ? "menu-link active blue" : "menu-link"}>Home</Link>
            <Link to="/about" className={location.pathname === "/about" ? "menu-link active blue" : "menu-link"}>About</Link>
            <Link to="/shop" className={location.pathname === "/shop" ? "menu-link active blue" : "menu-link"}>Shop</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "menu-link active blue" : "menu-link"}>Contact Us</Link>
            {user?.user.role === "admin" && (
              <Link to="/addproduct" className={location.pathname === "/addproduct" ? "menu-link active blue" : "menu-link"}>Add Product</Link>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default PharmaCare;
