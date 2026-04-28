import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the shop header and updates the cart count from quantities', () => {
  render(<App />);

  expect(screen.getByText(/shop to react/i)).toBeInTheDocument();
  expect(screen.getByText(/0 items/i)).toBeInTheDocument();

  const cologneQuantity = screen.getByLabelText(/unisex cologne quantity/i);
  fireEvent.change(cologneQuantity, { target: { value: '3' } });

  expect(screen.getByText(/3 items/i)).toBeInTheDocument();
});
