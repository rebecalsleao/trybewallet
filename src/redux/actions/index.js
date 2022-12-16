// Coloque aqui suas actions
export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';
export const EXPENSE_ACTION = 'EXPENSE_ACTION';
export const DELETE_ACTION = 'DELETE_ACTION';

export const emailAction = (email) => ({
  type: EMAIL_ACTION,
  payload: email,
});

export const walletAction = (currencies) => ({
  type: WALLET_ACTION,
  payload: currencies,
});

export const expenseAction = (expense) => ({
  type: EXPENSE_ACTION,
  payload: expense,
});

export const deleteAction = (expenseDelete) => ({
  type: DELETE_ACTION,
  payload: expenseDelete,
});
