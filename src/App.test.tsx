import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without throwing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders all section ids', () => {
    render(<App />);
    for (const id of ['projects', 'demo', 'skills', 'experience', 'about', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it('renders all project titles', () => {
    render(<App />);
    expect(screen.getByText('Contract Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Agentic Contract Review')).toBeInTheDocument();
    expect(screen.getByText('Annotation Automation')).toBeInTheDocument();
    expect(screen.getByText('Transcript Adjudication')).toBeInTheDocument();
    expect(screen.getByText('LLM Agentic Tagging')).toBeInTheDocument();
    expect(
      screen.getByText('AI Automatic Speech Recognition Agentic Tagger'),
    ).toBeInTheDocument();
  });

  it('renders the contract review demo section', () => {
    render(<App />);
    expect(screen.getByText('Live Demo')).toBeInTheDocument();
    expect(
      screen.getByText('Contract Review — try the actual LangGraph workflow.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Contract Review/i })).toBeInTheDocument();
  });

  it('renders all skill groups', () => {
    render(<App />);
    expect(screen.getByText('LLM Systems')).toBeInTheDocument();
    expect(screen.getByText('Agentic Tooling')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Modeling & Collaboration')).toBeInTheDocument();
  });

  it('renders both experience entries', () => {
    render(<App />);
    expect(screen.getByText('aiOla')).toBeInTheDocument();
    expect(screen.getByText('Tel Aviv University')).toBeInTheDocument();
  });

  it('renders contact section with all links', () => {
    render(<App />);
    expect(screen.getByText('orbarak1997@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/or-barak-b046b71a2')).toBeInTheDocument();
    expect(screen.getByText('github.com/OrBarak3')).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getAllByText(/Or Barak/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('OB')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders the footer metadata', () => {
    render(<App />);
    expect(screen.getByText(/\d{4} Or Barak/)).toBeInTheDocument();
    expect(screen.getAllByText('AI Engineer').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('React / TypeScript / Tailwind / Framer Motion')).toBeInTheDocument();
  });
});
