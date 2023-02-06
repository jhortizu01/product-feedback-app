import { render, screen } from '@testing-library/react';
import { FrontEndMentor } from './FrontEndMentor';
import '@testing-library/jest-dom/extend-expect';

describe('front end mentor block', () => {
  test('renders front end mentor header', () => {
    render(<FrontEndMentor />);
    const mainText = screen.getByRole('heading', { name: 'Front End Mentor' });
    expect(mainText).toHaveTextContent('Front End Mentor');
  });

  test('renders subheader', () => {
    render(<FrontEndMentor />);
    const subText = screen.getByRole('heading', { name: 'Feedback Board' });
    expect(subText).toHaveTextContent('Feedback Board');
  });
});
