export const calculateTaxDue = (annualIncome: number) => {
    switch (true) {
      case annualIncome <= 24511.92:
        return 0;
      case annualIncome <= 33919.80:
        return (annualIncome * 0.075) - 1838.39;
      case annualIncome <= 45012.60:
        return (annualIncome * 0.15) - 4382.38;
      case annualIncome <= 55976.16:
        return (annualIncome * 0.225) - 7758.32;
      default:
        return (annualIncome * 0.275) - 10557.13;
    }
  };
  
  export const calculateTaxPaid = (taxDue: number, { pensionContribution, educationExpenses, healthExpenses, numberOfDependents }: { pensionContribution?: string, educationExpenses?: string, healthExpenses?: string, numberOfDependents?: string }) => {
      const pension = parseFloat(pensionContribution ?? '') || 0;
      const education = parseFloat(educationExpenses ?? '') || 0;
      const health = parseFloat(healthExpenses ?? '') || 0;
      const dependents = parseInt(numberOfDependents ?? '', 10) || 0;
      const dependentDeduction = 2275 * dependents;
  
      const deductions = pension + education + health + dependentDeduction;
      const taxPaid = taxDue - deductions;
  
      return taxPaid > 0 ? taxPaid : 0;
  };