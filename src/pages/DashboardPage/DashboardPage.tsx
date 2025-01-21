import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Navbar from "../../components/NavBar";
import {
  Button,
  ButtonsBox,
  Container,
  ContentArea,
  DashboardContainer,
  DeclarationData,
  DeclarationItem,
  DeclarationsBox,
} from "./style/DashboardStyle";

export interface TaxDeclaration {
  id: string;
  taxYear: number;
  taxpayerCPF: string;
  annualIncome: number;
  taxDue: number;
  taxPaid: number;
  numberOfDependents?: number;
  pensionContribution?: number;
  educationExpenses?: number;
  healthExpenses?: number;
  creationDate: string;
  userId: string;
}

const DashboardPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [declarations, setDeclarations] = useState<TaxDeclaration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      navigate("/signin");
    } else {
      fetchDeclarations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);

  if (!auth) {
    return <div>Redirecionando para login...</div>;
  }

  const { token, user } = auth;

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
      const sortedDeclarations = response.data
        .sort((a: { taxYear: number; }, b: { taxYear: number; }) => b.taxYear - a.taxYear)
        .slice(0, 5);
      setDeclarations(sortedDeclarations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching declarations:", error);
      setLoading(false);
    }
  };

  if (!auth) {
    return <div>Redirecionando para login...</div>;
  }

  return (
    <Container>
      <Navbar onLogout={logout} />
      <DashboardContainer>
        <ButtonsBox>
          <Button onClick={() => navigate("/declarations/new")}>
            Nova Declaração
          </Button>
          <Button onClick={() => navigate("/declarations")}>
            Ver Todas as Declarações
          </Button>
        </ButtonsBox>
        <ContentArea>
          {loading ? (
            <p>Carregando declarações...</p>
          ) : declarations.length > 0 ? (
            <DeclarationsBox>
              <h2>Declarações Mais Recentes</h2>
              {declarations.map((declaration) => (
                <DeclarationItem key={declaration.id}>
                  <DeclarationData>
                    {" "}
                    CPF: {declaration.taxpayerCPF}{" "}
                  </DeclarationData>
                  <DeclarationData>
                    {" "}
                    Ano: {declaration.taxYear}{" "}
                  </DeclarationData>
                  <DeclarationData>
                    {" "}
                    Renda Anual: R$ {declaration.annualIncome.toLocaleString()}{" "}
                  </DeclarationData>
                  <DeclarationData>
                    {" "}
                    Imposto Pago: R$ {declaration.taxPaid.toLocaleString()}{" "}
                  </DeclarationData>
                </DeclarationItem>
              ))}
            </DeclarationsBox>
          ) : (
            <p>Você ainda não tem declarações.</p>
          )}
        </ContentArea>
      </DashboardContainer>
    </Container>
  );
};

export default DashboardPage;
