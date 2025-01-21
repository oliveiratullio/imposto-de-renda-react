import Modal from 'react-modal';
import styled from 'styled-components';

interface DeleteModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
}
  


Modal.setAppElement('#root');


const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <p>Tem certeza de que deseja excluir esta declaração?</p>
      <ButtonGroup>
        <Button onClick={onConfirm}>Sim</Button>
        <Button onClick={onRequestClose}>Não</Button>
      </ButtonGroup>
    </Modal>
  );
};

export default DeleteModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px'
  }
};

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
