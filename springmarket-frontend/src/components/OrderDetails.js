import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Product Name:</strong> {order.productName}</p>
      <p><strong>Product Price:</strong> {order.productPrice}</p>
      <p><strong>Product Description:</strong> {order.productDescription}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Credit Card Number:</strong> {order.creditCardNumber}</p>
    </div>
  );
};

export default OrderDetails;
