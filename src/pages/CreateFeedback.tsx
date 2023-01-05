import { useState } from 'react';
import { ProductRequest } from '../types';
import { Link, useParams } from 'react-router-dom';
import arrowDown from '../assets/shared/icon-arrow-down.svg';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import leftArrow from '../assets/shared/icon-arrow-left.svg';
import newFeedback from '../assets/shared/icon-new-feedback.svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
  productRequests: ProductRequest[];
}

export const CreateFeedback = (props: IProps) => {
  const { productRequests } = props;
  const [isOpen, setIsOpenState] = useState(false);
  const [category, setCategory] = useState('Feature');
  const [openBorder, setOpenBorder] = useState('');
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const openDropDown = () => {
    if (isOpen === true) {
      setIsOpenState(false);
      setOpenBorder('');
    } else {
      setIsOpenState(true);
      setOpenBorder('open');
    }
  };

  const changeCategory = (event: any) => {
    setCategory(event.target.id);
    setIsOpenState(false);
    setOpenBorder('');
  };

  const changeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const changeFeedback = (event: any) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = (event: any) => {
    const newId = productRequests.length + 1;
    const newFeedback = {
      id: newId,
      title: title,
      category: category,
      upvotes: 0,
      status: 'suggestion',
      description: feedback,
      comments: [],
    };

    productRequests.push(newFeedback);
    navigate('/');
    event.preventDefault();
  };

  return (
    <div className="create-feedback-page">
      <nav>
        <img src={leftArrow} alt="left arrow" />
        <Link to="/">Go Back</Link>
      </nav>
      <img
        src={newFeedback}
        alt="purple circle with white plus sign"
        className="add"
      />
      <form className="create-feedback">
        <h1>Create New Feedback</h1>
        <label htmlFor="title" className="create-feedback_heading">
          <span>Feedback Title</span>
          <span>Add a short, descriptive headline</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="text"
          value={title}
          onChange={changeTitle}
        />

        <label htmlFor="category" className="create-feedback_heading">
          <span>Category</span>
          <span>Choose a category for your feedback</span>
        </label>

        <ul className="dropdown">
          <div onClick={openDropDown} className={openBorder}>
            <li
              role="button"
              aria-labelledby="dropdown-label"
              id="dropdown__selected"
              tabIndex={0}
            >
              {category}
            </li>
            <img src={isOpen ? arrowUp : arrowDown} alt="arrow down" />
          </div>

          <li
            aria-expanded={isOpen}
            role="list"
            className="dropdown__list-container"
          >
            {isOpen === false ? null : (
              <ul className="dropwdown_list">
                <li className="dropdown_list-item" tabIndex={0}>
                  <span
                    id="Feature"
                    className={category === 'Feature' ? 'currentCategory' : ''}
                    onClick={changeCategory}
                  >
                    Feature
                  </span>
                </li>
                <li className="dropdown_list-item" tabIndex={0}>
                  <span
                    id="Enhancement"
                    className={
                      category === 'Enhancement' ? 'currentCategory' : ''
                    }
                    onClick={changeCategory}
                  >
                    Enhancement
                  </span>
                </li>
                <li className="dropdown_list-item" tabIndex={0}>
                  <span
                    id="Bug"
                    className={category === 'Bug' ? 'currentCategory' : ''}
                    onClick={changeCategory}
                  >
                    Bug
                  </span>
                </li>
                <li
                  className="dropdown_list-item"
                  tabIndex={0}
                  id="UI"
                  onClick={changeCategory}
                >
                  <span
                    id="UI"
                    className={category === 'UI' ? 'currentCategory' : ''}
                    onClick={changeCategory}
                  >
                    UI
                  </span>
                </li>
                <li className="dropdown_list-item" tabIndex={0}>
                  <span
                    id="UX"
                    className={category === 'UX' ? 'currentCategory' : ''}
                    onClick={changeCategory}
                  >
                    UX
                  </span>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <label htmlFor="title" className="create-feedback_heading">
          <span>Feedback Detail</span>
          <span>
            Include any specific comments on what should be improved, added,
            etc.
          </span>
        </label>
        <textarea
          id="story"
          name="story"
          className="text"
          value={feedback}
          onChange={changeFeedback}
        />

        <div className="button-container">
          <input
            className="add-feedback"
            type="submit"
            value="Add Feedback"
            onClick={submitFeedback}
          />
          <Link to="/">
            <input className="cancel" type="button" value="Cancel" />
          </Link>
        </div>
      </form>
    </div>
  );
};
