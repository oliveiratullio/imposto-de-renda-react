import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/NavBar';
import useAuth from '../../../hooks/useAuth';
import { Button, Form, Input, Label } from './style/NewDeclarationStyle';
import { calculateTaxDue, calculateTaxPaid } from '../../../utils/TaxCalculationUtils';


const CreateDeclarationPage = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState<{
    taxYear: number;
    taxpayerCPF: string;
    annualIncome: number;
    taxDue: number;
    taxPaid: number;
    numberOfDependents?: number;
    pensionContribution?: number;
    educationExpenses?: number;
    healthExpenses?: number;
  }>({
    taxYear: NaN,
    taxpayerCPF: '',
    annualIncome: NaN,
    taxDue: NaN,
    taxPaid: NaN,
    numberOfDependents: undefined,
    pensionContribution: undefined,
    educationExpenses: undefined,
    healthExpenses: undefined,
  });

  useEffect(() => {
    if (!auth) {
      navigate('/signin');
    }
  }, [auth, navigate]);

  if(!auth) {    
    return <div>Redirecionando para login...</div>;
  }

  const { token, user } = auth;

  const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value || 0 };

    if (['annualIncome', 'pensionContribution', 'educationExpenses', 'healthExpenses', 'numberOfDependents'].includes(name)) {
    const taxDue = calculateTaxDue(newFormData.annualIncome);
    const taxPaid = calculateTaxPaid(taxDue, {
        pensionContribution: String(newFormData.pensionContribution || 0),
        educationExpenses: String(newFormData.educationExpenses || 0),
        healthExpenses: String(newFormData.healthExpenses || 0),
        numberOfDependents: String(newFormData.numberOfDependents || 0)
      });
      newFormData.taxDue = parseFloat(taxDue.toFixed(2));
      newFormData.taxPaid = parseFloat(taxPaid.toFixed(2));
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const completedDeclaration = {
        ...formData,
        userId: user.id,
        taxYear: Number(formData.taxYear),
        annualIncome: Number(formData.annualIncome),
        taxDue: Number(formData.taxDue),
        taxPaid: Number(formData.taxPaid),
        numberOfDependents: Number(formData.numberOfDependents),
        pensionContribution: Number(formData.pensionContribution),
        educationExpenses: Number(formData.educationExpenses),
        healthExpenses: Number(formData.healthExpenses),
      };
    try {
       await axios.post(`${import.meta.env.VITE_API_URL}/tax-declarations`, completedDeclaration , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to create declaration:', error);
    }
  };

  return (
    <div>
      <Navbar onLogout={logout} />
      <Form onSubmit={handleSubmit}>
        <h1>Criar Nova Declaração</h1>
        <Label htmlFor="taxYear">Ano Fiscal</Label>
        <Input type="number" name="taxYear" value={formData.taxYear} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} max={currentYear} required />

        <Label htmlFor="taxpayerCPF">CPF do Contribuinte</Label>
        <Input type="text" name="taxpayerCPF" value={formData.taxpayerCPF} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} required />

        <Label htmlFor="annualIncome">Renda Anual (R$)</Label>
        <Input type="number" name="annualIncome" value={formData.annualIncome} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} required />

        <Label htmlFor="numberOfDependents">Número de Dependentes</Label>
        <Input type="number" name="numberOfDependents" value={formData.numberOfDependents} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} />

        <Label htmlFor="pensionContribution">Contribuição Previdenciária (R$)</Label>
        <Input type="number" name="pensionContribution" value={formData.pensionContribution} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} />

        <Label htmlFor="educationExpenses">Despesas com Educação (R$)</Label>
        <Input type="number" name="educationExpenses" value={formData.educationExpenses} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} />

        <Label htmlFor="healthExpenses">Despesas Médicas (R$)</Label>
        <Input type="number" name="healthExpenses" value={formData.healthExpenses} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} />

        <Label htmlFor="taxDue">Cálculo base de imposto (R$)</Label>
        <Input type="number" name="taxDue" value={formData.taxDue} onChange={() => {}} disabled />

        <Label htmlFor="taxPaid">Imposto a Pagar (R$)</Label>
        <Input type="number" name="taxPaid" value={formData.taxPaid} onChange={() => {}} disabled />

        <Button type="submit">Criar Declaração</Button>
      </Form>
    </div>
  );
};

export default CreateDeclarationPage;