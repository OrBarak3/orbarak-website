import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createFact, createMetric } from '../test/helpers';
import { Hero } from './Hero';

const metrics = [
  createMetric({ value: '$12K/mo', label: 'saved by reducing external annotation work' }),
  createMetric({ value: 'Weeks -> Minutes', label: 'LLM tagging process turnaround' }),
  createMetric({ value: '2025-Present', label: 'AI Engineer at aiOla' }),
];

const facts = [
  createFact({ label: 'Role', value: 'AI Engineer' }),
  createFact({ label: 'Focus', value: 'Prompt Engineering' }),
];

const workflowSteps = ['Transcribe', 'Extract', 'Validate', 'Route'];
const snippet = '{ "status": "ready" }';

describe('Hero', () => {
  it('renders the headline', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(
      screen.getByRole('heading', { level: 1 }),
    ).toHaveTextContent('AI Engineer building production-oriented LLM workflows');
  });

  it('renders the status badge', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByText(/aiOla · 2025-Present/)).toBeInTheDocument();
  });

  it('renders CTA links with correct hrefs', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    const viewProjects = screen.getByText('View Projects').closest('a');
    expect(viewProjects).toHaveAttribute('href', '#projects');

    const contactMe = screen.getByText('Contact Me').closest('a');
    expect(contactMe).toHaveAttribute('href', '#contact');
  });

  it('renders all metric cards', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByText('$12K/mo')).toBeInTheDocument();
    expect(screen.getByText('saved by reducing external annotation work')).toBeInTheDocument();
    expect(screen.getByText('Weeks -> Minutes')).toBeInTheDocument();
    expect(screen.getByText('2025-Present')).toBeInTheDocument();
  });

  it('renders all summary facts', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'AI Engineer' })).toBeInTheDocument();

    const roleCard = screen.getByText('Role').closest('div');
    expect(roleCard).not.toBeNull();
    expect(within(roleCard as HTMLElement).getByText('AI Engineer')).toBeInTheDocument();

    const focusCard = screen.getByText('Focus').closest('div');
    expect(focusCard).not.toBeNull();
    expect(within(focusCard as HTMLElement).getByText('Prompt Engineering')).toBeInTheDocument();
  });

  it('renders all workflow steps', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByText('Transcribe')).toBeInTheDocument();
    expect(screen.getByText('Extract')).toBeInTheDocument();
    expect(screen.getByText('Validate')).toBeInTheDocument();
    expect(screen.getByText('Route')).toBeInTheDocument();
  });

  it('renders the JSON snippet in a code element', () => {
    const { container } = render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    const codeEl = container.querySelector('code');
    expect(codeEl).toHaveTextContent('{ "status": "ready" }');
  });

  it('renders the section with id="top"', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(document.getElementById('top')).toBeInTheDocument();
  });
});
