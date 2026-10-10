import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the church landing page content', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /welcome to living dove chapel/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/impacting lives through christ-centered worship/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /there is a place for you here/i })).toBeInTheDocument();
});

test('mobile navigation can be opened and closed', () => {
  render(<App />);

  const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(screen.getByRole('link', { name: 'Gatherings' }));
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});
