import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Cadastro de usuário', () => {
  test('Se ao fazer o login é redirecionado para a página Wallet', () => {
    renderWithRouterAndRedux(<App />);
    const emailOk = 'test@test.com';
    const passwordOk = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');

    userEvent.type(emailInput, emailOk);
    userEvent.type(passwordInput, passwordOk);
    userEvent.click(button);

    const loggedEmail = screen.getByText(/test@test\.com/i);
    const totalExpensesSum = screen.getByText(/0\.00/i);
    const actualCurrency = screen.getByText(/brl/i);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(loggedEmail).toBeInTheDocument();
    expect(totalExpensesSum).toBeInTheDocument();
    expect(actualCurrency).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  test('Verifica se é possível adicionar despesas', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const methodInput = screen.getByTestId('method-input');
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = await screen.getByTestId('currency-input');
    const tagInput = screen.getByTestId('tag-input');
    const cashOption = screen.getByRole('option', { name: 'Dinheiro' });
    const eatOption = screen.getByRole('option', { name: 'Alimentação' });
    const USDOption = await screen.findByRole('option', { name: 'USD' });
    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.selectOptions(currencyInput, USDOption);
    userEvent.type(valueInput, '11');
    userEvent.type(descriptionInput, 'Onze dólares');
    userEvent.selectOptions(methodInput, cashOption);
    userEvent.selectOptions(tagInput, eatOption);
    userEvent.click(addExpenses);
  });
});
