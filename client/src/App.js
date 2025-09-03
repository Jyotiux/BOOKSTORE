import './App.css';
import { Routes, Route } from 'react-router-dom'; // no Router here
import SignupPage from './pages/signup';
import SigninPage from './pages/signin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/* Remove <Router> here */}
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
