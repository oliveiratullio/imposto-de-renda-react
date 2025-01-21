import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../contexts/AuthContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #5568FE;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #4056F4;
  }
`;

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
  }

// Componente de Login
const SignInPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [isDisabled, setIsDisabled] = useState(false);

    function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function sendForm(e: React.FormEvent<HTMLFormElement>) {
        console.log(form);
        e.preventDefault();
        setIsDisabled(true);
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, form)
          .then((response) => {
            const { data }  = response;
            console.log(data, "@@@@@@");
            login({
                token: data.user.access_token,
                user: {
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                }
              });
            setIsDisabled(false);
            console.log(response);
            navigate("/dashboard");
          })
          .catch((error) => {
            alert(error.response?.data || 'Unknown error');
            setIsDisabled(false);
            setForm({ email: "", password: "" });
          });
    }

    return (
        <Container>
            <FormBox>
                <Title>Login</Title>
                <form onSubmit={sendForm}>
                    <Input type="email" name="email" value={form.email} onChange={handleForm} placeholder="Email" required />
                    <Input type="password" name="password" value={form.password} onChange={handleForm} placeholder="Password" required />
                    <Button type="submit" disabled={isDisabled}>Log In</Button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Don’t have an account? <a href="/register">SignUp</a>
                </p>
            </FormBox>
        </Container>
    );
};

export default SignInPage;
