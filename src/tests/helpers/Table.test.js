import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testar componente Table', () => {
  test('Se a tabela é renderizada na tela', () => {
    renderWithRouterAndRedux(<App />);
    const infoTable = screen.querySelector('#root > div > div > div');
    expect(infoTable).toBeInTheDocument();
  });
});
