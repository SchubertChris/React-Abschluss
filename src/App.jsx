import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
<<<<<<< HEAD

// Importiere den Context Provider
import AppProvider from "./assets/layout/ContextAPI";

/* Rendern der Komponenten und setzen von Layout */
function App() {
  return (
    <AppProvider>
      <Router>
=======
import ProtectedRoute from "./assets/layout/ProtectedRoute"; // Import
import AppProvider from "./assets/layout/ContextAPI";
import NotFound404 from "./assets/pages/JSX/NotFound404"; // Import

function App() {
  return (
    <Router>
      <AppProvider>
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
<<<<<<< HEAD
            <Route path="/account-dashboard" element={<Dashboard />} />
=======
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
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
<<<<<<< HEAD
          </Routes>
        </main>
      </Router>
    </AppProvider>
=======

            {/* Dashboard geschützt */}
            <Route
              path="/account-dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
      </AppProvider>
    </Router>
>>>>>>> 8ed6fbb (Erneut Hochladen nach Crash)
  );
}

export default App;
