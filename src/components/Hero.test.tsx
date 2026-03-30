import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createFact, createMetric } from '../test/helpers';
import { Hero } from './Hero';

const metrics = [
  createMetric({ value: '74%', label: 'less manual review' }),
  createMetric({ value: '89%', label: 'open-text accuracy' }),
  createMetric({ value: 'Enterprise', label: 'speech-to-JSON workflows' }),
];

const facts = [
  createFact({ label: 'Role', value: 'AI Engineer' }),
  createFact({ label: 'Focus', value: 'Prompt Engineering' }),
];

const workflowSteps = ['Extract', 'Evaluate', 'Judge', 'Human Review'];
const snippet = '{ "status": "ready" }';

describe('Hero', () => {
  it('renders the headline', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(
      screen.getByRole('heading', { level: 1 }),
    ).toHaveTextContent('AI Engineer building reliable LLM workflows for production');
  });

  it('renders the status badge', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(
      screen.getByText(/Available for AI Engineering roles/),
    ).toBeInTheDocument();
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
    expect(screen.getByText('74%')).toBeInTheDocument();
    expect(screen.getByText('less manual review')).toBeInTheDocument();
    expect(screen.getByText('89%')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders all summary facts', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('AI Engineer')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('Prompt Engineering')).toBeInTheDocument();
  });

  it('renders all workflow steps', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(screen.getByText('Extract')).toBeInTheDocument();
    expect(screen.getByText('Evaluate')).toBeInTheDocument();
    expect(screen.getByText('Judge')).toBeInTheDocument();
    expect(screen.getByText('Human Review')).toBeInTheDocument();
  });

  it('renders the JSON snippet in a code element', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    const codeEl = screen.getByText('{ "status": "ready" }');
    expect(codeEl.tagName).toBe('CODE');
  });

  it('renders the section with id="top"', () => {
    render(
      <Hero facts={facts} metrics={metrics} workflowSteps={workflowSteps} snippet={snippet} />,
    );
    expect(document.getElementById('top')).toBeInTheDocument();
  });
});
