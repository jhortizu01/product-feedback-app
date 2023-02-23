import { render, screen, act } from '@testing-library/react';
import { RequestCards } from './RequestCards';
import { data } from '../data.ts';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Request Card Initial state', () => {
  test('Request card has a title, description, category, upvote count, and comment count', () => {
    render(
      <BrowserRouter>
        <RequestCards productRequests={data.productRequests} />
      </BrowserRouter>,
    );
    screen.getAllByRole('heading', { level: 3 });
    screen.getAllByTestId('description');
    screen.getAllByTestId('category');
    screen.getAllByTestId('upvotes');
    screen.getAllByTestId('comments');
  });
});

describe('Buttons functionality', () => {
  test('Button should start with a numerical value and when clicked should increase by 1', async () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
      disabledUpvotes: [],
    };
    render(
      <BrowserRouter>
        <RequestCards {...baseProps} productRequests={data.productRequests} />
      </BrowserRouter>,
    );
    const upvotesBtn = screen.getAllByTestId('upvotes');
    expect(upvotesBtn[0]).toHaveTextContent('112');

    await user.click(upvotesBtn[0]);
    expect(baseProps.addUpVote).toHaveBeenCalledTimes(1);
  });

  test('Button should start as enabled', async () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
      disabledUpvotes: [],
    };
    render(
      <BrowserRouter>
        <RequestCards {...baseProps} productRequests={data.productRequests} />
      </BrowserRouter>,
    );

    const upvotesBtn = screen.getAllByTestId('upvotes');
    expect(upvotesBtn[0]).toHaveProperty('disabled', false);
    await user.click(upvotesBtn[0]);
    expect(upvotesBtn[0]).toHaveProperty('disabled', false);
  });

  test('Should display the number of comments and navigate on click', async () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
      setCurrentFeedback: jest.fn(),
      disabledUpvotes: [],
    };
    render(
      <BrowserRouter>
        <RequestCards {...baseProps} productRequests={data.productRequests} />
      </BrowserRouter>,
    );
    const commentsBtn = screen.getAllByTestId('comments');
    expect(commentsBtn[0]).toHaveTextContent('2');
    await act(() => user.click(commentsBtn[0]));
    expect(baseProps.setCurrentFeedback).toHaveBeenCalledTimes(1);
    screen.getAllByRole('link');
  });
});
