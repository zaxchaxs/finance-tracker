import financialAdvice from "@/core/AppData/financialAdvice";

export const getRandomAdvice = (income?: number, expenses?: number): string => {
    // pake undifined karna income/expense bisa 0
    if(income == undefined || expenses == undefined) {
        return "";
    };

    if (income > expenses) {
      const randomIndex = Math.floor(Math.random() * financialAdvice.incomeGreaterThanExpenses.length);
      return financialAdvice.incomeGreaterThanExpenses[randomIndex];
    } else if (expenses > income) {
      const randomIndex = Math.floor(Math.random() * financialAdvice.expensesGreaterThanIncome.length);
      return financialAdvice.expensesGreaterThanIncome[randomIndex];
    } else {
      return "Income and expenses are equal. Maintain a balanced financial plan.";
    }
  }