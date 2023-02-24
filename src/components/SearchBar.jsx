import React from 'react';

export const SearchBar = ({ setValue }) => {
  return (
    <>
      <input
        onChange={setValue}
        type='text'
        placeholder='Search by name'
        className='searchbar-input outline-slate-500 rounded-sm w-4/5 p-2 mx-auto md:w-3/5'
      />
    </>
  );
};
