import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createExperienceEntry } from '../test/helpers';
import { ExperienceItem } from './ExperienceItem';

const entry = createExperienceEntry({
  company: 'aiOla',
  role: 'AI Engineer',
  label: 'Voice AI Company',
  summary: 'Built production AI workflows',
  bullets: ['Built LLM workflows', 'Designed evaluation methods'],
});

describe('ExperienceItem', () => {
  it('renders company, role, label, and summary', () => {
    render(<ExperienceItem entry={entry} isLast={false} />);
    expect(screen.getByRole('heading', { name: 'aiOla' })).toBeInTheDocument();
    expect(screen.getByText('AI Engineer')).toBeInTheDocument();
    expect(screen.getByText('Voice AI Company')).toBeInTheDocument();
    expect(screen.getByText('Built production AI workflows')).toBeInTheDocument();
  });

  it('renders all bullet points', () => {
    render(<ExperienceItem entry={entry} isLast={false} />);
    expect(screen.getByText('Built LLM workflows')).toBeInTheDocument();
    expect(screen.getByText('Designed evaluation methods')).toBeInTheDocument();
  });

  it('renders connecting line when isLast is false', () => {
    const { container } = render(
      <ExperienceItem entry={entry} isLast={false} />,
    );
    const line = container.querySelector('.h-\\[calc\\(100\\%\\+2rem\\)\\]');
    expect(line).toBeInTheDocument();
  });

  it('does not render connecting line when isLast is true', () => {
    const { container } = render(
      <ExperienceItem entry={entry} isLast={true} />,
    );
    const line = container.querySelector('.h-\\[calc\\(100\\%\\+2rem\\)\\]');
    expect(line).not.toBeInTheDocument();
  });

  it('shows "01" when not last and "02" when last', () => {
    const { rerender } = render(
      <ExperienceItem entry={entry} isLast={false} />,
    );
    expect(screen.getByText('01')).toBeInTheDocument();

    rerender(<ExperienceItem entry={entry} isLast={true} />);
    expect(screen.getByText('02')).toBeInTheDocument();
  });
});
