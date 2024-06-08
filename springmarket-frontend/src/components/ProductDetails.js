import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = (product) => {
    setSelectedProduct(product); // Set the selected product
    // Yönlendirme işlemi yap
    window.location.href = '/checkout'; // Örnek olarak checkout sayfasına yönlendiriyoruz
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getRandomImageUrl = () => {
    return `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <div className="container">
      <h1 className="my-4">Product List</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={getRandomImageUrl()} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} TL</p>
                <button className="btn btn-primary" onClick={() => placeOrder(product)}>Sipariş Ver</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
