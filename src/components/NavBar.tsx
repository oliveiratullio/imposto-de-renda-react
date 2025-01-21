import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';


const Navbar = ({ onLogout }: { onLogout: () => void }) => {
  const { auth } = useAuth();
  if (!auth) {
    return null;
  }

  return (
    <NavbarContainer>
      <UserInfo>
        <Name>Bem-vindo(a), {auth.user.name}</Name>
        <Button onClick={onLogout}>
          <FiLogOut />
          Logout
        </Button>
      </UserInfo>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  background-color: #EEEEEE;
  border-bottom: 1px solid #E2E2E2;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 16px;
  margin-right: 20px;
`;

const Button = styled.button`
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

export default Navbar;
