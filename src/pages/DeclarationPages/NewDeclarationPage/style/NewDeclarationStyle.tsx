import styled from "styled-components";

export const Form = styled.form`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
  border-radius: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
  appearance: textfield;
  -moz-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Label = styled.label`
  margin-top: 10px;
  display: block;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;
