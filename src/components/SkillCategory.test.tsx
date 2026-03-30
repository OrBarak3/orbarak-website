import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createSkillGroup } from '../test/helpers';
import { SkillCategory } from './SkillCategory';

const group = createSkillGroup({
  title: 'Core AI',
  description: 'Designing reliable LLM behavior',
  items: ['Prompt Engineering', 'LLM Evaluation', 'Structured Outputs'],
});

describe('SkillCategory', () => {
  it('renders the group title', () => {
    render(<SkillCategory group={group} />);
    expect(screen.getByText('Core AI')).toBeInTheDocument();
  });

  it('renders the group description', () => {
    render(<SkillCategory group={group} />);
    expect(screen.getByText('Designing reliable LLM behavior')).toBeInTheDocument();
  });

  it('renders all skill items', () => {
    render(<SkillCategory group={group} />);
    expect(screen.getByText('Prompt Engineering')).toBeInTheDocument();
    expect(screen.getByText('LLM Evaluation')).toBeInTheDocument();
    expect(screen.getByText('Structured Outputs')).toBeInTheDocument();
  });

  it('displays the correct item count', () => {
    render(<SkillCategory group={group} />);
    expect(screen.getByText('3 items')).toBeInTheDocument();
  });

  it('renders inside an article element', () => {
    render(<SkillCategory group={group} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
