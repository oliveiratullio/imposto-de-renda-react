import styled from "styled-components";

export const Container = styled.div`
  max-width: 75%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeclarationItem = styled.div`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonBox = styled.div`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-left: 15px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PageButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background-color: #f0f0f0;
  border: 1px solid #d0d0d0;
  border-radius: 5px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
