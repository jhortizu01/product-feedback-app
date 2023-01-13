import { useState } from 'react';
import { ProductRequest } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import arrowDown from '../assets/shared/icon-arrow-down.svg';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import leftArrow from '../assets/shared/icon-arrow-left.svg';
import newFeedback from '../assets/shared/icon-new-feedback.svg';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Category } from '@mui/icons-material';

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: 'Chocolate', label: 'Chocolate' },
  { value: 'Strawberry', label: 'Strawberry' },
  { value: 'Vanilla', label: 'Vanilla' },
];
interface IProps {
  productRequests: ProductRequest[];
}

type Inputs = {
  title: string;
  feedback: string;
  category: string;
};

export const CreateFeedback = (props: IProps) => {
  const { productRequests } = props;
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    defaultValues: { title: '', category: 'Vanilla', feedback: '' },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    productRequests.push({
      id: productRequests.length + 1,
      title: data.title,
      category: data.category,
      upvotes: 0,
      status: 'suggestion',
      description: data.feedback,
      comments: [],
    });

    console.log(productRequests);
    // navigate('/');
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
          {errors.title && <span className="error">Can't be empty.</span>}
          <input type="text" {...register('title', { required: true })} />
        </div>

        <label htmlFor="category">
          <span>Category</span>
          <span>Choose a category for your feedback</span>
        </label>
        <Controller
          control={control}
          name="category"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              name={name}
              value={getValues('category')}
              inputRef={ref}
              options={options}
              onChange={(selectedOption: Option) =>
                onChange(selectedOption.value)
              }
            />
          )}
          rules={{ required: true }}
        />
        {/*  */}

        {/* <select id="category" {...register('category')}>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
            <option value="enhancement">Enhancement</option>
            <option value="ui">UI</option>
            <option value="ux">UX</option>
          </select> */}

        <div>
          <label htmlFor="feedback">
            <span>Feedback Detail</span>
            <span>
              Include any specific comments on what should be improved, added,
              etc.
            </span>
          </label>
          {errors.feedback && <span className="error">Can't be empty.</span>}
          <input type="text" {...register('feedback', { required: true })} />
        </div>

        <input type="submit" value="Add Feedback" className="add-feedback" />

        <Link to={'/'} className="cancel">
          Cancel
        </Link>
      </form>
    </section>
  );
};
