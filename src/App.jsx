import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./assets/layout/Header";
import AppProvider from "./assets/layout/ContextAPI";
import ProtectedRoute from "./assets/layout/ProtectedRoute";

// 💤 Lazy Load für Seitenkomponenten
const Home = React.lazy(() => import("./assets/pages/JSX/Home"));
const Dashboard = React.lazy(() => import("./assets/pages/JSX/Dashboard"));
const Login = React.lazy(() => import("./assets/pages/JSX/Login"));
const AboutUs = React.lazy(() => import("./assets/pages/JSX/AboutUs"));
const Blog = React.lazy(() => import("./assets/pages/JSX/Blog"));
const Shop = React.lazy(() => import("./assets/pages/JSX/Shop"));
const Categories = React.lazy(() => import("./assets/pages/JSX/Categories"));
const NotFound404 = React.lazy(() => import("./assets/pages/JSX/NotFound404"));

function App() {
  return (
    <Router basename="/React-Abschluss">
      <AppProvider>
        <Header />
        <main>
          <Suspense fallback={<div>Lädt...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login-register" element={<Login />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
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
          </Suspense>
        </main>
      </AppProvider>
    </Router>
  );
}

export default App;
