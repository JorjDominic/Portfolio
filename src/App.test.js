import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
test('font pairing switches and persists the selected option', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', {name: /try a font pairing/i}));
  fireEvent.click(screen.getByRole('button', {name: /Playfair Display/}));
  expect(localStorage.getItem('font-pair')).toBe('2');
  expect(screen.getByRole('button', {name: /Playfair Display/})).toHaveAttribute('aria-pressed', 'true');
});
test('sample project opens and closes', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', {name: /A quieter kind of brand/}));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Close project'}));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
