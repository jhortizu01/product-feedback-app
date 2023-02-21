import { render, screen } from '@testing-library/react';
import { Roadmap } from './Roadmap';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('roadmap initial state', () => {
  test('Roadmap has title called Roadmap', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    const roadmapTitle = screen.getByRole('heading', { name: 'Roadmap' });
    expect(roadmapTitle).toHaveTextContent('Roadmap');
  });
  test('Roadmap should have a button called View', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    const roadMapButton = screen.getByRole('button', { name: 'View' });
    expect(roadMapButton).toHaveTextContent('View');
  });
  test('Roadmap should have a status called planned with a value of 4', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    const plannedLabel = screen.getByTestId('planned');
    expect(plannedLabel).toHaveTextContent('planned');
  });
  test('Roadmap should have a status called in-progress with a value of 1', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    const plannedLabel = screen.getByTestId('in-progress');
    expect(plannedLabel).toHaveTextContent('in-progress');
  });
  test('Roadmap should have a status called live with a value of 1', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    const plannedLabel = screen.getByTestId('live');
    expect(plannedLabel).toHaveTextContent('live');
  });
  test('View should be a link', () => {
    render(
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>,
    );
    screen.getByRole('link', { name: 'View' });
  });
});
