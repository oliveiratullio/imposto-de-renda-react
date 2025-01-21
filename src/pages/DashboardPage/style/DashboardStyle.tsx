import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const DashboardContainer = styled.div`
  width: 75%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;


export const Button = styled.button`
  padding: 10px 20px;
  margin-right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 5px;
  }
`;

export const ContentArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

export const DeclarationsBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding-top: 10px;
`;


export const DeclarationItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  margin-top: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const DeclarationData = styled.div`
  width: 20%;
  flex: 1 1 auto;
  padding-left: 5px;
  margin: 5px; 
  font-size: 14px;
  font-weight: 300;
  margin: 10px 0px 10px 0px;

  @media (max-width: 768px) {
    font-size: 16px;
    width: 45%;
  }
  @media (max-width: 480px) {
    width: 45%;
    font-size: 12px; 
  }
`;