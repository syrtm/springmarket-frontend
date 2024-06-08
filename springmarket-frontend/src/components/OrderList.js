import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from '../components/OrderDetails'; // Dosya yolunu güncelleyin

const OrderList = () => {
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem('token');

  const fetchOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8083/orders/getOrder', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const cancelOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8083/orders/cancel', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        fetchOrder(); // Siparişleri yeniden al
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:8083/auth/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-12">
          {order && order.id ? (
            <div>
              <OrderDetails order={order} />
              {!order.cancelled && (
                <button className="btn btn-danger" onClick={cancelOrder}>Cancel Order</button>
              )}
            </div>
          ) : (
            <p>No purchased item</p>
          )}
          <button className="btn btn-danger mt-3" onClick={deleteAccount}>Delete My Account</button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
