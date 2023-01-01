import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlClose } from "react-icons/sl";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity)

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className={styles.header}>
      <NavLink to="/" onClick={hideMenu}>
        <span><h2>Shop</h2></span>
          
        </NavLink>
      <div
        className={showMenu ? `${styles.showMenu}` : `${styles.menuWrapper}`}
      >
        
        <nav
          className={
            showMenu ? `${styles.showMobMenu}` : `${styles.hideMobMenu}`
          }
        >
          <ul>
            <li>
              <NavLink to="/" onClick={hideMenu} className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={hideMenu} className={activeLink}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={hideMenu} className={activeLink}>
                Products
              </NavLink>
            </li>
          </ul>
          <span onClick={() => setShowMenu(false)}>
            <SlClose />
          </span>
        </nav>
        
      </div>

      <div className={styles.cart}>
        <NavLink to="/cart" className={activeLink}>
          Cart
          <span>
            <FiShoppingCart size={26} />
          </span>
          <b>
            <p>{cartTotalQuantity}</p>
          </b>
        </NavLink>
      </div>
      <div className={styles.mobMenu}>
        <GiHamburgerMenu
          size={32}
          color="white"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      </div>
    </header>
  );
};

export default Header;
