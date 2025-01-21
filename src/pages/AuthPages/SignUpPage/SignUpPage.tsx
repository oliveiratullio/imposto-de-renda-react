
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, ErrorMessage, FormBox, Input, Title } from './style/SignUpStyle';


function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, formData);
      navigate('/signin');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Failed to register. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Name" required onChange={handleInputChange} />
          <Input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
          <Input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
          <Button type="submit">Register</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Já tem uma conta?{' '}
          <a href="/signin" style={{ color: '#5568FE' }}>Conecte-se</a>
        </p>
      </FormBox>
    </Container>
  );
}

export default SignUpPage;
