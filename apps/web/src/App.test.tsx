import { render, screen } from '@testing-library/react';

import { App } from './App.tsx';

describe('App shell', () => {
  it('renders the quiet Petal entry surface', () => {
    render(<App />);

    expect(screen.getByRole('main', { name: /a small green thing is waking/i })).toBeVisible();
    expect(screen.getByText(/first plant/i)).toBeVisible();
    expect(screen.getByRole('list', { name: /early plant signals/i })).toBeVisible();
  });
});
