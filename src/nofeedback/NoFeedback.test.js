import { render, screen } from '@testing-library/react';
import { NoFeedback } from './NoFeedback';

describe('No Feedback initial state', () => {
  test('Nofeedback displays title, description and image', () => {
    render(<NoFeedback />);
    screen.getByRole('heading', {
      level: 1,
      name: 'There is no feedback yet.',
    });
    screen.getByRole('heading', {
      level: 2,
      name: 'Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.',
    });
    screen.getByRole('img', { name: 'plus' });
  });
});
