import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./assets/layout/Wrapper";
import "./main.scss";
import Header from "./assets/layout/Header";
import Home from "./assets/pages/JSX/Home";
import Dashboard from "./assets/pages/JSX/Dashboard";
import Login from "./assets/pages/JSX/Login";
import AboutUs from "./assets/pages/JSX/AboutUs";
import Blog from "./assets/pages/JSX/Blog";
import Shop from "./assets/pages/JSX/Shop";
import Categories from "./assets/pages/JSX/Categories";
import New from "./assets/pages/JSX/New";
import Offers from "./assets/pages/JSX/Offers";
import Popular from "./assets/pages/JSX/Popular";
import Cart from "./assets/pages/JSX/Cart";
import ShippingReturns from "./assets/pages/JSX/ShippingReturns";

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account-dashboard" element={<Dashboard />} />
            <Route path="/login-register" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/new" element={<New />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
          </Routes>
        </main>
      </Wrapper>
    </Router>
  );
}

export default App;
