export const colorstyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    border: state.isFocused ? '#4661e6 solid 1px' : 'transparent solid 1px',
    backgroundColor: '#F7F8FD',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '16px',
    marginTop: '16px',
    width: '100%',
    ':hover': {
      cursor: 'pointer',
      border: 'transparent',
    },
  }),
  menu: (base: any) => ({
    ...base,
    width: '100%',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    border: 'transparent solid 1px',
  }),
  valueContainer: () => ({
    height: '20px',
    paddingLeft: '24px',
  }),
  menuList: () => ({
    width: '100%',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    display: 'flex',
    height: '100%',
    width: 'fit-content',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: '#4661E6',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: '#647196',
    backgroundColor: 'transparent',
    ':hover': {
      cursor: 'pointer',
      color: '#AD1FEA',
    },
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: 'solid 1px #F2F4FF',
    ':after': state.isSelected
      ? {
          content: '"✔"',
          color: '#AD1FEA',
          display: 'block',
          marginRight: 8,
          height: 10,
          width: 10,
        }
      : { backgroundColor: 'transparent' },
    ':last-of-type': {
      borderBottom: 'none',
    },
  }),
};
