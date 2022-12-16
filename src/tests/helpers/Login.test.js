import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const EMAIL_TEST = 'teste@trybe.com.br';

describe('Testar o componente Login', () => {
  test('Se a tela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Se o email digitado é válido.', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), EMAIL_TEST);
    expect(screen.getByRole('button', { name: /entrar/i }).disabled).toBe(true);
  });

  test('Se o input do login possui data-testid com valor "email-input".', () => {
    renderWithRouterAndRedux(<App />);
    const idEmail = screen.getByTestId('email-input');
    expect(idEmail).toBeInTheDocument();
  });

  test('Se o input da senha possui data-testid com valor "password-input".', () => {
    renderWithRouterAndRedux(<App />);
    const idPassword = screen.getByTestId('password-input');
    expect(idPassword).toBeInTheDocument();
  });

  test('Se inicialmente o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Se ao preencher os inputs o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const correctEmail = 'usuario@email.com';
    const passwordOk = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, passwordOk);
    expect(button).toBeEnabled();
  });

  test('Se ao preencher incorretamente os inputs o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const incorrectEmail = 'testeErrado.com';
    const inpasswordOk = '1234';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, inpasswordOk);
    expect(button).toBeDisabled();
  });

  test('Se ao preencher apenas um dos campos ou um dos campos incorretamente o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const incorrectEmail = 'teste.com';
    const passwordOk = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, passwordOk);
    expect(button).toBeDisabled();
  });

  test('Se ao preencher apenas um dos campos ou um dos campos incorretamente o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const correctEmail = 'test@test.com';
    const inpasswordOk = '1234';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button');
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, inpasswordOk);
    expect(button).toBeDisabled();
  });
});
