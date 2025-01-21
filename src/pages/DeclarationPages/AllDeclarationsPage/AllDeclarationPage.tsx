import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/NavBar';
import useAuth from '../../../hooks/useAuth';
import { TaxDeclaration } from '../../DashboardPage/DashboardPage';
import DeleteModal from '../../../components/DeleteModal';
import { Button, ButtonBox, Container, DeclarationItem, PageButton, PaginationContainer } from './style/AllDeclarationStyle';



const AllDeclarationsPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [declarations, setDeclarations] = useState<TaxDeclaration[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeclarationId, setSelectedDeclarationId] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      navigate('/signin');
    } else {
      fetchDeclarations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate, currentPage]);

  if(!auth) {
    return <div>Redirecionando para login...</div>
  }

  const{user, token} = auth;

  const handleDeleteClick = (declarationId: string) => {
    setSelectedDeclarationId(declarationId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDeclarationId) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/tax-declarations/${selectedDeclarationId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDeclarations(prev => prev.filter(item => item.id !== selectedDeclarationId));
        setIsModalOpen(false);
        setSelectedDeclarationId(null);
      } catch (error) {
        console.error('Failed to delete declaration:', error);
      }
    }
  };

  const fetchDeclarations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tax-declarations/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeclarations(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.error("Error fetching declarations:", error);
    }
  };

  const handleEdit = (declarationId: string) => {
    navigate(`/declarations/edit/${declarationId}`);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <PageButton key={index} onClick={() => setCurrentPage(index)}>
        {index + 1}
      </PageButton>
    ));
  };

  return (
    <div>
      <Navbar onLogout={logout} />
      <Container>
        <h1>Todas as Declarações</h1>
        {declarations.map(declaration => (
          <DeclarationItem key={declaration.id}>
            <div>
              Ano: {declaration.taxYear} 
            </div>
            <ButtonBox>
                <Button onClick={() => handleEdit(declaration.id)}>Editar</Button>
                <Button onClick={() => handleDeleteClick(declaration.id)}>Excluir</Button>
            </ButtonBox>
          </DeclarationItem>
        ))}
        <PaginationContainer>
          {renderPageNumbers()}
        </PaginationContainer>
      </Container>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AllDeclarationsPage;
