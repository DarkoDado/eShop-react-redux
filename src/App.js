import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
