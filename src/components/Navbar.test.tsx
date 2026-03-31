import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { createAvailabilityStatus, createNavItem } from '../test/helpers';
import { Navbar } from './Navbar';

const items = [
  createNavItem({ id: 'projects', label: 'Projects' }),
  createNavItem({ id: 'skills', label: 'Skills' }),
  createNavItem({ id: 'contact', label: 'Contact' }),
];
const availability = createAvailabilityStatus();

describe('Navbar', () => {
  it('renders all nav items', () => {
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Skills').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the logo text', () => {
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    expect(screen.getByText('OB')).toBeInTheDocument();
    expect(screen.getByText('Or Barak')).toBeInTheDocument();
  });

  it('renders Get in Touch CTA with correct href', () => {
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    const ctas = screen.getAllByText('Get in Touch');
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    expect(ctas[0].closest('a')).toHaveAttribute('href', '#contact');
  });

  it('has mobile toggle with correct aria attributes', () => {
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the availability badge in the desktop navbar', () => {
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    expect(screen.getByLabelText('Available for AI Engineering roles')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('opens mobile menu on toggle click', async () => {
    const user = userEvent.setup();
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByText('Available').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Available for AI Engineering roles')).toBeInTheDocument();
  });

  it('closes mobile menu on second toggle click', async () => {
    const user = userEvent.setup();
    render(<Navbar items={items} activeSection="projects" availability={availability} />);
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies active styling to the matching nav item', () => {
    render(<Navbar items={items} activeSection="skills" availability={availability} />);
    const desktopNav = screen.getAllByText('Skills');
    const activeLink = desktopNav.find((el) =>
      el.classList.contains('bg-white/10'),
    );
    expect(activeLink).toBeDefined();
  });

  it('closes mobile menu when activeSection changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Navbar items={items} activeSection="projects" availability={availability} />,
    );
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    rerender(<Navbar items={items} activeSection="skills" availability={availability} />);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
