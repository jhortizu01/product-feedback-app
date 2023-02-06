import { render, screen } from '@testing-library/react';
import { Filter } from './Filter';

describe('Filter Block', () => {
  test('Filter has a button called All', () => {
    render(<Filter />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton.textContent).toBe('All');
  });

  test('Filter has a button called UX', () => {
    render(<Filter />);
    const uxButton = screen.getByRole('button', { name: 'UX' });
    expect(uxButton.textContent).toBe('UX');
  });

  test('Filter has a button called UI', () => {
    render(<Filter />);
    const uiButton = screen.getByRole('button', { name: 'UI' });
    expect(uiButton.textContent).toBe('UI');
  });

  test('Filter has a button called Enhancement', () => {
    render(<Filter />);
    const enhancementButton = screen.getByRole('button', {
      name: 'Enhancement',
    });
    expect(enhancementButton.textContent).toBe('Enhancement');
  });

  test('Filter has a button called Enhancement', () => {
    render(<Filter />);
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    expect(bugButton.textContent).toBe('Bug');
  });

  test('Filter has a button called Enhancement', () => {
    render(<Filter />);
    const featureButton = screen.getByRole('button', { name: 'Feature' });
    expect(featureButton.textContent).toBe('Feature');
  });
});
