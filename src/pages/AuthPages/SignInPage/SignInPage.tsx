import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { Button, Container, FormBox, Input, Title } from './style/SignInStyle';


function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
  }


const SignInPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [isDisabled, setIsDisabled] = useState(false);

    function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function sendForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsDisabled(true);
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, form)
          .then((response) => {
            const { data }  = response;
            login({
                token: data.user.access_token,
                user: {
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                }
              });
            setIsDisabled(false);
            navigate("/");
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
                    Não tem uma conta? <a href="/signup">Crie uma</a>
                </p>
            </FormBox>
        </Container>
    );
};

export default SignInPage;
