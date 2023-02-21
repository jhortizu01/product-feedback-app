export const colorstyles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    ':hover': {
      cursor: 'pointer',
      border: 'transparent',
    },
    boxShadow: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: () => ({
    color: 'white',
  }),
  valueContainer: () => ({
    display: 'flex',
    alignItems: 'center',
    color: '$mid-gray',
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
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: '#4661E6',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  option: () => ({
    border: 'solid 1px red',
    height: '47px',
    fontSize: '16px',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: '$font-jost',
    color: 'purple',
  }),
};
