import { getByDisplayValue, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar';

describe('Toolbar Initial State', () => {
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

    screen.getByText('Most Upvotes');

    const addFeedbackBtn = screen.getByRole('button', {
      name: 'plus Add Feedback',
    });
    expect(addFeedbackBtn).toBeInTheDocument();
  });
});

describe('Toolbar interaction', () => {
  test('Should start closed and when clicked should show options', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Toolbar numberOfRequests={12} />
      </BrowserRouter>,
    );

    const nullLeastUpvotes = screen.queryByText('Least Upvotes');
    expect(nullLeastUpvotes).not.toBeInTheDocument();
    const mostUpvotes = screen.getByText('Most Upvotes');

    await user.click(mostUpvotes);
    const leastUpvotes = screen.queryByText('Least Upvotes');
    expect(leastUpvotes).toBeInTheDocument();
    const mostComments = screen.queryByText('Most Comments');
    expect(mostComments).toBeInTheDocument();
    const leastComments = screen.queryByText('Least Comments');
    expect(leastComments).toBeInTheDocument();
  });
  test('Add feedback button directs to create feedback page', () => {
    render(
      <BrowserRouter>
        <Toolbar numberOfRequests={12} />
      </BrowserRouter>,
    );

    const addFeedbackLink = screen.getByRole('link', {
      name: 'plus Add Feedback',
    });
    expect(addFeedbackLink).toHaveAttribute('href', '/create-feedback');
  });
});
