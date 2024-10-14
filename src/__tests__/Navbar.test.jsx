import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar component', () => {
  it('should show the correct header text', () => {
    render(<Navbar />);

    expect(screen.getByRole('heading')).toHaveTextContent(/DOIT-rn/i);
  });
})