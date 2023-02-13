import { render, screen } from '@testing-library/react';
import { Roadmap } from './Roadmap';
import '@testing-library/jest-dom/extend-expect';

describe('roadmap initial state', () => {
  test('Roadmap has title called Roadmap', () => {
    render(<Roadmap />);
    const roadmapTitle = screen.getByRole('heading', { name: 'Roadmap' });
    expect(roadmapTitle).toHaveTextContent('Roadmap');
  });
  test('Roadmap should have a button called View', () => {
    render(<Roadmap />);
    const roadMapButton = screen.getByRole('button', { name: 'View' });
    expect(roadMapButton).toHaveTextContent('View');
  });
  test.skip('Roadmap should have a status called planned with a value of 4', () => {
    render(<Roadmap />);
    const plannedLabel = screen.getByRole('listitem', { name: 'planned' });
    expect(plannedLabel).toHaveTextContent('planned');
  });
  test.skip('Roadmap should have a status called in-progress with a value of 1', () => {
    render(<Roadmap />);
    const plannedLabel = screen.getByRole('listitem', { name: 'in-progress' });
    expect(plannedLabel).toHaveTextContent('in-progress');
  });
  test.skip('Roadmap should have a status called live with a value of 1', () => {
    render(<Roadmap />);
    const plannedLabel = screen.getByRole('listitem', { name: 'live' });
    expect(plannedLabel).toHaveTextContent('live');
  });
});
