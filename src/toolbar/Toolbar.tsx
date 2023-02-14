import React, { useState } from 'react';
import '../index.scss';
import gear from '../assets/icon-gear.svg';
import plus from '../assets/shared/icon-plus.svg';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { NoEncryptionSharp } from '@mui/icons-material';
import { autocompleteClasses } from '@mui/material';
interface IProps {
  callback(id: string): void;
  sortOption: string;
  check: any;
  mobileOverlay: string;
  numberOfRequests?: number;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Toolbar = (props: IProps) => {
  const { callback, sortOption, mobileOverlay, numberOfRequests } = props;
  const [hiddenState, setHiddenState] = useState<string>('hidden');

  return (
    <div className={`toolbar ${mobileOverlay}`}>
      <aside className="toolbar-left">
        <div>
          <img src={gear} alt="gear icon" />
          <h2>{numberOfRequests} Suggestions</h2>
        </div>
      </aside>
      <div className="toolbar__sort" id="sort">
        <span>Sort By: </span>
        <Select
          options={options}
          placeholder="Most Upvotes"
          styles={{
            control: (baseStyles: any, state: any) => ({
              ...baseStyles,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              ':hover': {
                cursor: 'pointer',
                border: 'transparent',
              },
            }),
            indicatorSeparator: () => ({
              backgroundColor: 'transparent',
            }),
            menu: () => ({
              width: '255px',
              top: '65px',
              position: 'absolute',
              left: '-55px',
              backgroundColor: 'white',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
            }),
            dropdownIndicator: (base: any, state: any) => ({
              ...base,
              color: '#4661E6',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
            }),
          }}
        />
      </div>
      <aside className="toolbar-right">
        <Link to="/create-feedback" className="add-feedback">
          <img src={plus} alt="plus" />
          Add Feedback
        </Link>
      </aside>
    </div>
  );
};
