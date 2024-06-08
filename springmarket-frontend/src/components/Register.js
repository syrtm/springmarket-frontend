import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Kullanıcı verilerini oluşturun, role alanını sabit olarak belirtin
      const userData = {
        email,
        username,
        password,
        role: ["user"] // Role bilgisini sabit olarak "user" olarak belirtin
      };

      const response = await api.post('/auth/register', userData);
      alert(response.data.message);
      navigate('/login'); // Başarılı kayıt sonrası /login sayfasına yönlendirme
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
