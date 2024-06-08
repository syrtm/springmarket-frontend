import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const PaymentPage = () => {
  const [productId, setProductId] = useState(null);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [address, setAddress] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const storedProductId = localStorage.getItem('selectedProductId');
      if (storedProductId) {
        setProductId(storedProductId);
      } else {
        navigate('/products');
      }
    }
  }, [navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // token değişkenini tanımlıyoruz

    try {
      const order = {
        product: {
          id: productId,
        },
        orderDate,
        address,
        creditCardNumber,
        cancelled: false,
      };
  
      const response = await api.post('/orders/add', order, {
        headers: {
          Authorization: `Bearer ${token}`, // token değişkenini kullanıyoruz
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        localStorage.removeItem('selectedProductId');
        navigate('/orders');
      } else {
        throw new Error('Order creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Ödeme Sayfası</h1>
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kredi Kartı Numarası"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adres"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Ödeme Yap</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
