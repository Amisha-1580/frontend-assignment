import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h4>Register</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-success" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
