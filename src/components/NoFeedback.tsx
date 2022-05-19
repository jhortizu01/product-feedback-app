import React from 'react';
import missing from '../assets/missing.png';
import plus from '../assets/shared/icon-plus.svg';

export const NoFeedback = () => {
  return (
    <section className="no-feedback">
      <img src={missing} alt="cartoon detective figure with magnifying glass" />
      <span>There is no feedback yet.</span>
      <span>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </span>
      <button className="add-feedback">
        <img src={plus} alt="plus" />
        Add Feedback
      </button>
    </section>
  );
};
