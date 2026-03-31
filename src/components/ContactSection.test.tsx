import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createContactLink } from '../test/helpers';
import { ContactSection } from './ContactSection';

const links = [
  createContactLink({ label: 'Email', value: 'test@test.com', href: 'mailto:test@test.com' }),
  createContactLink({ label: 'LinkedIn', value: 'linkedin.com/test', href: 'https://linkedin.com/test' }),
  createContactLink({ label: 'GitHub', value: 'github.com/test', href: 'https://github.com/test' }),
];

describe('ContactSection', () => {
  it('renders with id="contact"', () => {
    render(<ContactSection links={links} />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders all contact link cards with correct label and value', () => {
    render(<ContactSection links={links} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/test')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('github.com/test')).toBeInTheDocument();
  });

  it('each link card has the correct href', () => {
    render(<ContactSection links={links} />);
    const emailLink = screen.getByText('test@test.com').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:test@test.com');

    const linkedinLink = screen.getByText('linkedin.com/test').closest('a');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/test');
  });

  it('renders the Contact section title', () => {
    render(<ContactSection links={links} />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
