import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testar o componente Table', () => {
  test('Se a tela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const description = screen.querySelector('columnheader', { name: /descrição/i });
    const tag = screen.querySelector('columnheader', { name: /tag/i });
    const method = screen.querySelector('columnheader', { name: /método de pagamento/i });
    const value = screen.querySelector('columnheader', { name: /valor/i });
    const coin = screen.querySelector('columnheader', { name: /moeda/i });
    const exchange = screen.querySelector('columnheader', { name: /câmbio utilizado/i });
    const convertedValue = screen.querySelector('columnheader', { name: /valor convertido/i });
    const convertedCoin = screen.querySelector('columnheader', { name: /moeda de conversão/i });
    const button = screen.querySelector('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(convertedCoin).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
