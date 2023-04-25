import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// SVG
import leftArrow from '../assets/shared/icon-arrow-left.svg';
import newFeedback from '../assets/shared/icon-new-feedback.svg';

// Types
import { ProductRequest, LabelValue } from '../types';
import { colorstyles } from './colorstyles';

type Inputs = {
  title: string;
  feedback: string;
  category: string;
};

const categoryOptions: LabelValue[] = [
  {
    value: 'Enhancement',
    label: 'Enhancement',
  },
  { value: 'Bug', label: 'Bug' },
  { value: 'Feature', label: 'Feature' },
  { value: 'UI', label: 'UI' },
  { value: 'UX', label: 'UX' },
];

interface IProps {
  productRequests: ProductRequest[];
}

export const CreateFeedback = (props: IProps) => {
  const { productRequests } = props;
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { title: '', category: 'Enhancement', feedback: '' },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch('/api/productRequests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: productRequests.length + 1,
        title: data.title,
        category: data.category,
        upvotes: 0,
        status: 'suggestion',
        description: data.feedback,
        comments: [],
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

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
        <div className="container">
          <label htmlFor="titleRequired">
            <h2>Feedback Title</h2>
            <p>Add a short, descriptive headline</p>
          </label>
          {errors.title && (
            <span className="error" data-testid="error-title">
              Can't be empty.
            </span>
          )}
          <input
            type="text"
            className="text"
            data-testId="feedback-title"
            {...register('title', { required: true })}
          />
        </div>

        <label htmlFor="category">
          <h2>Category</h2>
          <p>Choose a category for your feedback</p>
        </label>
        <div className="dropdown">
          <Controller
            name="category"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, name, ref } }) => {
              const currentSelection = categoryOptions.find(
                (c: LabelValue) => c.value === value,
              );

              return (
                <Select
                  name={name}
                  options={categoryOptions}
                  onChange={(selectedOption: LabelValue | null): void => {
                    onChange(selectedOption?.value);
                  }}
                  ref={ref}
                  value={currentSelection}
                  styles={colorstyles}
                />
              );
            }}
          />
        </div>
        <div className="container">
          <label htmlFor="feedback">
            <h2>Feedback Detail</h2>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </label>
          {errors.feedback && (
            <span className="error" data-testId="error-description">
              Can't be empty.
            </span>
          )}
          <textarea
            id="feedback"
            className="text"
            {...register('feedback', { required: true })}
          />
        </div>

        <div className="button-container">
          <input type="submit" value="Add Feedback" className="add-feedback" />
          <button className="cancel">
            <Link to={'/'}>Cancel</Link>
          </button>
        </div>
      </form>
    </section>
  );
};
