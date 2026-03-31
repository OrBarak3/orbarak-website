import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  const props = {
    eyebrow: 'Test Eyebrow',
    title: 'Test Title',
    description: 'Test description text',
  };

  it('renders the eyebrow text', () => {
    render(<SectionTitle {...props} />);
    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument();
  });

  it('renders the title in an h2 element', () => {
    render(<SectionTitle {...props} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('renders the description text', () => {
    render(<SectionTitle {...props} />);
    expect(screen.getByText('Test description text')).toBeInTheDocument();
  });
});
