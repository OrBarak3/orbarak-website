import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BackToTopButton } from './BackToTopButton';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
    writable: true,
  });
}

describe('BackToTopButton', () => {
  it('is hidden before the scroll threshold is reached', () => {
    setScrollY(0);
    render(<BackToTopButton />);
    expect(screen.queryByRole('link', { name: 'Back to top' })).not.toBeInTheDocument();
  });

  it('appears after scrolling past the threshold', () => {
    setScrollY(0);
    render(<BackToTopButton />);

    setScrollY(700);
    fireEvent.scroll(window);

    const button = screen.getByRole('link', { name: 'Back to top' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '#top');
  });
});
