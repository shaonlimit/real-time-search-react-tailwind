import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Product } from '../Product';
import { SearchBar } from '../SearchBar';
import Title from '../Title';

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
    'https://dummyjson.com/products?limit=0',
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
  for (var i = data.products.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = data.products[i];
    data.products[i] = data.products[j];
    data.products[j] = temp;
  }

  return (
    <div className=' flex flex-col gap-8'>
      <Title />

      <SearchBar setValue={(e) => setValue(e.target.value)} />
      <div className='main p-4 grid grid-cols-1 gap-6 md:grid-cols-4 md:p-8'>
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
