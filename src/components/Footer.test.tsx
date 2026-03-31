import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createFooterMeta } from '../test/helpers';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the supplied metadata', () => {
    render(<Footer meta={createFooterMeta()} />);
    expect(screen.getByText(/\d{4} Or Barak/)).toBeInTheDocument();
    expect(screen.getByText('AI Engineer')).toBeInTheDocument();
    expect(screen.getByText('React / TypeScript / Tailwind / Framer Motion')).toBeInTheDocument();
  });
});
