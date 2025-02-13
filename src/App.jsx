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
import Cart from "./assets/pages/JSX/Cart";
import AppProvider from "./assets/layout/ContextAPI";
import ProtectedRoute from "./assets/layout/ProtectedRoute";
import NotFound404 from "./assets/pages/JSX/NotFound404";

function App() {
  return (
    <Router basename="/React-Abschluss">
        <AppProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/account-dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
    </AppProvider>
      </Router>
  );
}

export default App;
