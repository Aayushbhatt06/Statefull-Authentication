import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
  const { email, password } = formData;
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      if (setUser) setUser({ name: data.data.name, email: data.data.email });
      navigate('/');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert(error.message || 'Error logging in');
  }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      /><br /><br />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
