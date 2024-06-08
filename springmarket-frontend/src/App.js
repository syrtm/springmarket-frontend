import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import OrderList from './components/OrderList';
import PaymentPage from './components/PaymentPage'; // Ödeme sayfasını içe aktarın
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';  // Navbar bileşenini içe aktarın
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar bileşenini buraya ekleyin */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } />
          <Route path="/product/:id" element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={<PaymentPage />} /> {/* Ödeme sayfasının rotasını oluşturun */}
          <Route path="/my" element={<PaymentPage />} /> {/* Ödeme sayfasının rotasını oluşturun */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
