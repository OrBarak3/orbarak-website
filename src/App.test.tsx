import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without throwing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders all section ids', () => {
    render(<App />);
    for (const id of ['projects', 'skills', 'experience', 'about', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it('renders all project titles', () => {
    render(<App />);
    expect(screen.getByText('LLM Pseudo Tagging System')).toBeInTheDocument();
    expect(screen.getByText('ASR Transcript Judging Pipeline')).toBeInTheDocument();
    expect(
      screen.getByText('Enterprise Speech-to-Structured-Output Workflows'),
    ).toBeInTheDocument();
  });

  it('renders all skill groups', () => {
    render(<App />);
    expect(screen.getByText('Core AI')).toBeInTheDocument();
    expect(screen.getByText('LLM / Agent Systems')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Data / Analytics')).toBeInTheDocument();
  });

  it('renders both experience entries', () => {
    render(<App />);
    expect(screen.getByText('aiOla')).toBeInTheDocument();
    expect(screen.getByText('Tel Aviv University')).toBeInTheDocument();
  });

  it('renders contact section with all links', () => {
    render(<App />);
    expect(screen.getByText('your.email@example.com')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/your-profile')).toBeInTheDocument();
    expect(screen.getByText('github.com/your-handle')).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getByText('Or Barak')).toBeInTheDocument();
    expect(screen.getByText('OB')).toBeInTheDocument();
  });
});
