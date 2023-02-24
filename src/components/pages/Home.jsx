import React, { useEffect, useState } from 'react';
import { Product } from '../Product';
import { SearchBar } from '../SearchBar';
import Title from '../Title';
import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  const data = res.json();
  return data;
};

export const Home = () => {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => res.json())
      .then((data) => setSearch(data.products));
  }, [value]);

  const { data, isLoading, error } = useSWR(
    'https://dummyjson.com/products',
    fetcher
  );
  if (error)
    return (
      <h1 className='text-2xl text-center text-white font-bold mt-4'>
        Products are unavailable now!
      </h1>
    );
  if (isLoading)
    return (
      <h1 className='text-2xl text-center text-white font-bold mt-4'>
        Products are loading...
      </h1>
    );

  return (
    <div className=' flex flex-col gap-8'>
      <Title />

      <SearchBar setValue={(e) => setValue(e.target.value)} />
      <div className='main p-8 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {search.length === 0 && value !== '' ? (
          <p className='text-2xl text-center text-white font-bold col-span-4'>
            No items found.
          </p>
        ) : (
          <>
            {value !== ''
              ? search.map((item, index) => (
                  <Product key={index} product={item} />
                ))
              : data.products.map((item, index) => (
                  <Product key={index} product={item} />
                ))}
          </>
        )}
      </div>
    </div>
  );
};