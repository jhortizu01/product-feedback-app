import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateFeedback } from './CreateFeedback';
import '@testing-library/jest-dom';

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
