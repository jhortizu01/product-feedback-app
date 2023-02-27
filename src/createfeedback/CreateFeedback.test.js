import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateFeedback } from './CreateFeedback';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Description } from '@mui/icons-material';

describe('Create Feedback Initial State', () => {
  test('Should have a link to go back with an arrow, a plus icon, Create New Feedback heading, feedback title, feedback title description, feedback text box, category title, category title description, dropdown menu, feedback detail heading, feedback detail description, feedback detail text box, add feedback button and cancel button', () => {
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );
    screen.getByAltText('left arrow');
    screen.getByRole('link', { name: 'left arrow Go Back' });
    screen.getByAltText('plus sign');
    screen.getByRole('heading', { name: 'Create New Feedback', level: 1 });
    screen.getByRole('heading', { name: 'Feedback Title', level: 2 });
    screen.getByText('Add a short, descriptive headline');
    screen.getByTestId('feedback-title');
    screen.getByRole('heading', { name: 'Category', level: 2 });
    screen.getByText('Choose a category for your feedback');
    screen.getByRole('combobox');
    screen.getByRole('heading', { name: 'Feedback Detail', level: 2 });
    screen.getByText(
      'Include any specific comments on what should be improved, added, etc.',
    );
    screen.getByRole('textbox', {
      name: 'Feedback Detail Include any specific comments on what should be improved, added, etc.',
    });
    screen.getByRole('button', { name: 'Add Feedback' });
    screen.getByRole('button', { name: 'Cancel' });
  });
});

describe('Create New Feedback functionality', () => {
  test('Should be able to input into feedback title input and feedback detail input', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );
    const feedbackTitleInput = screen.getByTestId('feedback-title');
    await user.type(feedbackTitleInput, 'test');
    expect(feedbackTitleInput).toHaveValue('test');

    const descriptionInput = screen.getByRole('textbox', {
      name: 'Feedback Detail Include any specific comments on what should be improved, added, etc.',
    });
    await user.type(descriptionInput, 'test2');
    expect(descriptionInput).toHaveValue('test2');
  });

  test('Errors should appear when trying to submit empty feedback title and description', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );

    const addFeedbackBtn = screen.getByRole('button', { name: 'Add Feedback' });
    await user.click(addFeedbackBtn);
    const errorTitle = await screen.findByTestId('error-title');
    expect(errorTitle).toBeInTheDocument();
    const errorDescription = await screen.findByTestId('error-description');
    expect(errorDescription).toBeInTheDocument();
  });

  test('Error should appear when title input is missing', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Feedback Detail Include any specific comments on what should be improved, added, etc.',
    });
    await user.type(descriptionInput, 'test2');
    const addFeedbackBtn = screen.getByRole('button', { name: 'Add Feedback' });
    await user.click(addFeedbackBtn);
    const errorTitle = await screen.findByTestId('error-title');
    expect(errorTitle).toBeInTheDocument();
  });

  test('Error should appear when description input is empty', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );
    const feedbackTitleInput = screen.getByTestId('feedback-title');
    await user.type(feedbackTitleInput, 'test');
    const addFeedbackBtn = screen.getByRole('button', { name: 'Add Feedback' });
    await user.click(addFeedbackBtn);
    const errorDescription = await screen.findByTestId('error-description');
    expect(errorDescription).toBeInTheDocument();
  });

  test('Cancel button returns to main page', () => {
    render(
      <BrowserRouter>
        <CreateFeedback />
      </BrowserRouter>,
    );

    const cancelBtn = screen.getByRole('link', { name: 'Cancel' });
    expect(cancelBtn).toHaveAttribute('href', '/');
  });
});
