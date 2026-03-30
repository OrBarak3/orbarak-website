import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { createProject } from '../test/helpers';
import { ProjectCard } from './ProjectCard';

const project = createProject();

describe('ProjectCard', () => {
  it('renders project title, summary, and id badge', () => {
    render(<ProjectCard project={project} />);
    expect(
      screen.getByRole('heading', { name: 'Test Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('A test project summary')).toBeInTheDocument();
    expect(screen.getByText('test-project')).toBeInTheDocument();
  });

  it('renders all impact items', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Impact 1')).toBeInTheDocument();
    expect(screen.getByText('Impact 2')).toBeInTheDocument();
    expect(screen.getByText('Impact 3')).toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
  });

  it('renders detail toggle buttons with aria-expanded false initially', () => {
    render(<ProjectCard project={project} />);
    const archBtn = screen.getByRole('button', { name: 'View Architecture' });
    const schemaBtn = screen.getByRole('button', { name: 'View Schema' });
    expect(archBtn).toHaveAttribute('aria-expanded', 'false');
    expect(schemaBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not show detail panel initially', () => {
    render(<ProjectCard project={project} />);
    expect(screen.queryByText('Architecture Detail')).not.toBeInTheDocument();
    expect(screen.queryByText('Schema Detail')).not.toBeInTheDocument();
  });

  it('expands architecture detail on click', async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} />);
    const btn = screen.getByRole('button', { name: 'View Architecture' });

    await user.click(btn);

    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Architecture Detail')).toBeInTheDocument();
    expect(screen.getByText('Architecture description')).toBeInTheDocument();
    expect(screen.getByText('Arch bullet 1')).toBeInTheDocument();
    expect(screen.getByText('arch code here')).toBeInTheDocument();
  });

  it('collapses architecture detail on second click', async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} />);
    const btn = screen.getByRole('button', { name: 'View Architecture' });

    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');

    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches from architecture to schema on click', async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} />);
    const archBtn = screen.getByRole('button', { name: 'View Architecture' });
    const schemaBtn = screen.getByRole('button', { name: 'View Schema' });

    await user.click(archBtn);
    expect(screen.getByText('Architecture Detail')).toBeInTheDocument();

    await user.click(schemaBtn);
    expect(schemaBtn).toHaveAttribute('aria-expanded', 'true');
    expect(archBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Schema Detail')).toBeInTheDocument();
    expect(screen.getByText('Schema description')).toBeInTheDocument();
  });

  it('does not render pre block when snippet is absent', async () => {
    const user = userEvent.setup();
    const noSnippetProject = createProject({
      details: {
        architecture: {
          key: 'architecture',
          label: 'View Architecture',
          title: 'No Snippet Arch',
          description: 'Desc',
          bullets: ['B1'],
          snippet: undefined,
        },
        schema: {
          key: 'schema',
          label: 'View Schema',
          title: 'Schema',
          description: 'Desc',
          bullets: ['B1'],
          snippet: '{}',
        },
      },
    });
    render(<ProjectCard project={noSnippetProject} />);
    const btn = screen.getByRole('button', { name: 'View Architecture' });

    await user.click(btn);
    expect(screen.getByText('No Snippet Arch')).toBeInTheDocument();
    expect(screen.queryByRole('code')).not.toBeInTheDocument();
  });
});
