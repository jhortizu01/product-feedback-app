import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Feedback } from './Feedback';
import { data } from '../data.ts';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Feedback Initial State', () => {
  test('Should display a back button that goes back to the home page, edit feedback button that takes you to the edit feedback page, a request card, comments with replies if any,  and a form to submit comments', () => {
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );
    const goBackBtn = screen.getByRole('link', { name: 'Go Back' });
    expect(goBackBtn).toHaveAttribute('href', '/');
    screen.getByRole('button', { name: 'Edit Feedback' });
    screen.getByTestId('request-card');
    screen.getByTestId('feedback-container');
    screen.getByTestId('add-comment');
    screen.getByRole('button', { name: 'Post Comment' });
  });

  test('Request card has a title, description, category, upvote count, and comment count', () => {
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );
    screen.getByRole('heading', { level: 3 });
    screen.getAllByTestId('description');
    screen.getAllByTestId('category');
    screen.getAllByTestId('upvotes');
    screen.getAllByTestId('comments');
  });

  test('Comments should have a title displaying amount of comments, user image for every comment, user first and last name, user name, description of comment and reply button', () => {
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );
    screen.getByRole('heading', { level: 4, name: '2 Comments' });
    screen.getAllByAltText('user');
    screen.getAllByTestId('fullname');
    screen.getAllByTestId('username');
    screen.getAllByTestId('user-comment');
  });

  test('Add comment form should have a title of Add Comment, a text input, show how many characters you have left and a post comment button', () => {
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );

    screen.getByRole('group', { name: 'Add Comment' });
    screen.getByRole('textbox');
    screen.getByTestId('characters-left');
    screen.getByRole('button', { name: 'Post Comment' });
  });
});

describe('Feedback functionality', () => {
  test('Clicking upvote button changes upvotes', async () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );

    const upvoteBtn = screen.getByRole('button', { name: '112' });

    await user.click(upvoteBtn);
    expect(baseProps.addUpVote).toHaveBeenCalledTimes(1);
  });

  //need to build feature
  test('Clicking the reply button opens up a text box for users to type in a rply and a button to post a reply and adds the reply', () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );

    
  });

  test('User can type a comment, post the comment, and have new number of comments', async () => {
    const user = userEvent.setup();
    const baseProps = {
      addUpVote: jest.fn(),
    };
    render(
      <BrowserRouter>
        <Feedback
          {...baseProps}
          productRequests={data.productRequests}
          currentFeedback={1}
          currentUser={data.currentUser}
          disabledUpVotes={[]}
        />
      </BrowserRouter>,
    );

    const commentBox = screen.getByRole('textbox');
    const postBtn = screen.getByRole('button', { name: 'Post Comment' });

    await user.type(commentBox, 'Test');
    await user.click(postBtn);

    await screen.findByText('Zena Kelley');
    await screen.findByText('velvetround');

    screen.getByRole('heading', { name: '3 Comments' });
  });
});
