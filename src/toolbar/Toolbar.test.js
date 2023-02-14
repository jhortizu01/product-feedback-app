import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar';

describe('Toolbar Initial State', () => {
  //gear icon is on page
  test('Gear Icon is visible, number of suggestions render in the toolbar, sorted by most upvotes, add feedback button is visible', () => {
    render(
      <BrowserRouter>
        <Toolbar numberOfRequests={12} />
      </BrowserRouter>,
    );
    screen.getByAltText('gear icon');

    screen.getByRole('heading', {
      name: '12 Suggestions',
      level: 2,
    });

    const sortSelection = screen.getByRole('option', {
      name: 'Most Upvotes',
      selected: true,
    });
  });
});
