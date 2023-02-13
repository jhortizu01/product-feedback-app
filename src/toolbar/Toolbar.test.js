import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar';

describe('Toolbar Initial State', () => {
  //gear icon is on page
  test('Gear Icon is visible', () => {
    render(
      <BrowserRouter>
        <Toolbar />
      </BrowserRouter>,
    );
    const gearIcon = screen.getByAltText('gear icon');
    expect(gearIcon).toBeInTheDocument();
  });
  //TODO: build functionality for Suggestions
  test('Number of suggestions match number of request cards', () => {});
  //TODO: Change sort to react select
  test('Sort by is sorted by Most Up Votes', () => {});
  //Add Feedback
  test('Add feedback button is in document and directs you to create feedback page upon click', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Toolbar />
      </BrowserRouter>,
    );
    
  });
});
