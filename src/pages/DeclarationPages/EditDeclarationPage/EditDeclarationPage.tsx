import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/NavBar';
import useAuth from '../../../hooks/useAuth';
import {Button, Form, Input, Label } from '../NewDeclarationPage/style/NewDeclarationStyle';
import { calculateTaxDue, calculateTaxPaid } from '../../../utils/TaxCalculationUtils';


const EditDeclarationPage = () => {
    const { id } = useParams();
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [formData, setFormData] = useState({
      taxYear: currentYear,
      taxpayerCPF: '',
      annualIncome: 0,
      taxDue: 0,
      taxPaid: 0,
      numberOfDependents: 0,
      pensionContribution: 0,
      educationExpenses: 0,
      healthExpenses: 0,
    });
  
    useEffect(() => {
      if (!auth) {
        navigate('/signin');
      } else {
        fetchDeclaration();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, navigate, id]);
  
    if (!auth) {
      return <div>Redirecionando para login...</div>;
    }
  
    const { token } = auth;
  
    const fetchDeclaration = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tax-declarations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setFormData({
          taxYear: data.taxYear || currentYear,
          taxpayerCPF: data.taxpayerCPF || '',
          annualIncome: data.annualIncome || 0,
          taxDue: data.taxDue || 0,
          taxPaid: data.taxPaid || 0,
          numberOfDependents: data.numberOfDependents || 0,
          pensionContribution: data.pensionContribution || 0,
          educationExpenses: data.educationExpenses || 0,
          healthExpenses: data.healthExpenses || 0,
        });
      } catch (error) {
        console.error('Error fetching declaration:', error);
      }
    };
  
    const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
      const { name, value } = event.target;
      const newFormData = { ...formData, [name]: parseFloat(value) || 0 };
      updateTaxCalculations(newFormData);
    };
  
    const updateTaxCalculations = (newFormData: { taxYear: number; taxpayerCPF: string; annualIncome: number; taxDue: number; taxPaid: number; numberOfDependents: number; pensionContribution: number; educationExpenses: number; healthExpenses: number; }) => {
        const taxDue = calculateTaxDue(newFormData.annualIncome);
        const taxPaid = calculateTaxPaid(taxDue, {
          pensionContribution: String(newFormData.pensionContribution || 0),
          educationExpenses: String(newFormData.educationExpenses || 0),
          healthExpenses: String(newFormData.healthExpenses || 0),
          numberOfDependents: String(newFormData.numberOfDependents || 0),
        });
        setFormData({ ...newFormData,taxpayerCPF: String(newFormData.taxpayerCPF), taxDue: parseFloat(taxDue.toFixed(2)), taxPaid: parseFloat(taxPaid.toFixed(2)) });
      };
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      console.log(formData, "!!!!!")
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/tax-declarations/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/declarations');
      } catch (error) {
        console.error('Failed to update declaration:', error);
      }
    };
  
    return (
      <div>
        <Navbar onLogout={logout} />
        <Form onSubmit={handleSubmit}>
          <h1>Editar Declaração</h1>
          <Label htmlFor="taxYear">Ano Fiscal</Label>
          <Input type="number" name="taxYear" value={formData.taxYear.toString()} onChange={handleInputChange} max={currentYear} required />
  
          <Label htmlFor="taxpayerCPF">CPF do Contribuinte</Label>
          <Input type="text" name="taxpayerCPF" value={formData.taxpayerCPF} onChange={handleInputChange} required />
  
          <Label htmlFor="annualIncome">Renda Anual</Label>
          <Input type="number" name="annualIncome" value={formData.annualIncome.toString()} onChange={handleInputChange} required />
  
          <Label htmlFor="numberOfDependents">Número de Dependentes</Label>
          <Input type="number" name="numberOfDependents" value={formData.numberOfDependents.toString()} onChange={handleInputChange} />
  
          <Label htmlFor="pensionContribution">Contribuição Previdenciária</Label>
          <Input type="number" name="pensionContribution" value={formData.pensionContribution.toString()} onChange={handleInputChange} />
  
          <Label htmlFor="educationExpenses">Despesas com Educação</Label>
          <Input type="number" name="educationExpenses" value={formData.educationExpenses.toString()} onChange={handleInputChange} />
  
          <Label htmlFor="healthExpenses">Despesas Médicas</Label>
          <Input type="number" name="healthExpenses" value={formData.healthExpenses.toString()} onChange={handleInputChange} />
  
          <Label htmlFor="taxDue">Cálculo base de imposto</Label>
          <Input type="number" name="taxDue" value={formData.taxDue.toString()} onChange={() => {}} disabled />
  
          <Label htmlFor="taxPaid">Imposto a Pagar</Label>
          <Input type="number" name="taxPaid" value={formData.taxPaid.toString()} onChange={() => {}} disabled />
  
          <Button type="submit">Atualizar Declaração</Button>
        </Form>
      </div>
    );
  };
  
  export default EditDeclarationPage;
  