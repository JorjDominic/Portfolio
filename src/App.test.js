import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
beforeEach(() => { localStorage.clear(); delete document.documentElement.dataset.theme; });
test('dark mode toggles and persists across visits', () => {
  const {unmount}=render(<App />);
  fireEvent.click(screen.getByRole('button',{name:'Switch to dark mode'}));
  expect(document.documentElement).toHaveAttribute('data-theme','dark');
  expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  unmount(); render(<App />);
  expect(document.documentElement).toHaveAttribute('data-theme','dark');
  fireEvent.click(screen.getByRole('button',{name:'Switch to light mode'}));
  expect(document.documentElement).toHaveAttribute('data-theme','light');
});
test('sample project opens and closes', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', {name: /A quieter kind of brand/}));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', {name: 'Close project'}));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
