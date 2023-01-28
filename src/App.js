import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
import Details from "./components/product/details/Details";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Slide} from "react-toastify"
import { Products } from "./pages/products/Products";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/details/:ID" element={<Details />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer transition={Slide}/>
    </div>
  );
}

export default App;
