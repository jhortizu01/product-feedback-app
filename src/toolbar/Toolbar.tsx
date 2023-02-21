import React, { useState } from 'react';
import '../index.scss';
import gear from '../assets/icon-gear.svg';
import plus from '../assets/shared/icon-plus.svg';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { colorstyles } from './colorstyles';
import check from '../assets/shared/icon-check.svg';

//TODO: import color styles, remove below
//TODO: Checkmark on selected
interface IProps {
  callback(id: string): void;
  sortOption: string;
  mobileOverlay: string;
  numberOfRequests?: number;
  setSortOption: any;
}

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'most-upvotes', label: 'Most Upvotes' },
  { value: 'least-upvotes', label: 'Least Upvotes' },
  { value: 'most-comments', label: 'Most Comments' },
  { value: 'least-comments', label: 'Least Comments' },
];

export const Toolbar = (props: IProps) => {
  const {
    callback,
    sortOption,
    mobileOverlay,
    numberOfRequests,
    setSortOption,
  } = props;

  return (
    <div className={`toolbar ${mobileOverlay}`}>
      <aside className="toolbar-left">
        <div>
          <img src={gear} alt="gear icon" />
          <h2>{numberOfRequests} Suggestions</h2>
        </div>
      </aside>
      <div className="toolbar__sort" id="sort">
        <span>Sort By : </span>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(selectedOption) => callback(selectedOption!.value)}
          placeholder="Most Upvotes"
          className="sortBy"
          styles={{
            control: (baseStyles: any, state: any) => ({
              ...baseStyles,
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              ':hover': {
                cursor: 'pointer',
                border: 'transparent',
              },
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            singleValue: () => ({
              color: 'white',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              '@include for-desktop()': {
                fontSize: '16px',
              },
            }),
            valueContainer: () => ({
              display: 'flex',
              alignItems: 'center',
              color: '$mid-gray',
            }),
            input: () => ({
              display: 'none',
            }),
            placeholder: () => ({}),
            menu: () => ({
              width: '255px',
              top: '65px',
              position: 'absolute',
              left: '-55px',
              backgroundColor: 'white',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
              color: '#647196',
              ':hover': {
                color: '$violet',
              },
            }),
            indicatorsContainer: () => ({
              padding: '0 !important',
            }),
            dropdownIndicator: (base: any, state: any) => ({
              ...base,
              color: '#4661E6',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
            }),
            option: (state: any) => ({
              border: 'solid red 1px',
              height: '47px',
              fontSize: '16px',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: '$font-jost',
              ':hover': {
                color: '#AD1FEA',
                cursor: 'pointer',
              },
              backgroundColor: state.hasValue ? 'yellow' : 'red',
            }),
          }}
        />
      </div>
      <aside className="toolbar-right">
        <button>
          <Link to="/create-feedback" className="add-feedback">
            <img src={plus} alt="plus" />
            Add Feedback
          </Link>
        </button>
      </aside>
    </div>
  );
};
