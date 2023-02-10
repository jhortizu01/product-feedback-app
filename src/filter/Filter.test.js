import { render, screen } from '@testing-library/react';
import { Filter } from './Filter';

describe('Filter Block', () => {
  test('Filter has a button called All', () => {
    render(<Filter />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toHaveTextContent('All');
  });

  test('Filter has a button called UX', () => {
    render(<Filter />);
    const uxButton = screen.getByRole('button', { name: 'UX' });
    expect(uxButton).toHaveTextContent('UX');
  });

  test('Filter has a button called UI', () => {
    render(<Filter />);
    const uiButton = screen.getByRole('button', { name: 'UI' });
    expect(uiButton).toHaveTextContent('UI');
  });

  test('Filter has a button called Enhancement', () => {
    render(<Filter />);
    const enhancementButton = screen.getByRole('button', {
      name: 'Enhancement',
    });
    expect(enhancementButton).toHaveTextContent('Enhancement');
  });

  test('Filter has a button called Bug', () => {
    render(<Filter />);
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    expect(bugButton).toHaveTextContent('Bug');
  });

  test('Filter has a button called Feature', () => {
    render(<Filter />);
    const featureButton = screen.getByRole('button', { name: 'Feature' });
    expect(featureButton).toHaveTextContent('Feature');
  });
});
