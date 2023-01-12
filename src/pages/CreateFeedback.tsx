import { useState } from 'react';
import { ProductRequest } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import arrowDown from '../assets/shared/icon-arrow-down.svg';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import leftArrow from '../assets/shared/icon-arrow-left.svg';
import newFeedback from '../assets/shared/icon-new-feedback.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
interface IProps {
  productRequests: ProductRequest[];
}

type Inputs = {
  titleRequired: string;
  feedbackRequired: string;
  category: string;
};

export const CreateFeedback = (props: IProps) => {
  const { productRequests } = props;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    productRequests.push({
      id: productRequests.length + 1,
      title: data.titleRequired,
      category: data.category,
      upvotes: 0,
      status: 'suggestion',
      description: data.feedbackRequired,
      comments: [],
    });

    console.log(productRequests);
    navigate('/');
  };

  return (
    <section className="feedback">
      <Link to={'/'} className="go-back">
        <img src={leftArrow} alt="left arrow" />
        Go Back
      </Link>
      <img className="add" src={newFeedback} alt="plus sign" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create New Feedback</h1>
        <div>
          <label htmlFor="titleRequired">
            <span>Feedback Title</span>
            <span>Add a short, descriptive headline</span>
          </label>
          {errors.titleRequired && (
            <span className="error">Can't be empty.</span>
          )}
          <input
            type="text"
            {...register('titleRequired', { required: true })}
          />
        </div>

        <label htmlFor="category">
          <span>Category</span>
          <span>Choose a category for your feedback</span>
        </label>
        <select id="category" {...register('category')}>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="enhancement">Enhancement</option>
          <option value="ui">UI</option>
          <option value="ux">UX</option>
        </select>

        <div>
          <label htmlFor="feedbackRequired">
            <span>Feedback Detail</span>
            <span>
              Include any specific comments on what should be improved, added,
              etc.
            </span>
          </label>
          {errors.feedbackRequired && (
            <span className="error">Can't be empty.</span>
          )}
          <input
            type="text"
            {...register('feedbackRequired', { required: true })}
          />
        </div>

        <input type="submit" value="Add Feedback" className="add-feedback" />

        <Link to={'/'} className="cancel">
          Cancel
        </Link>
      </form>
    </section>
  );
};
