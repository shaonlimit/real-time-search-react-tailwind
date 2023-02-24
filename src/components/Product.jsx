import React from 'react';

export const Product = ({
  product: { title, description, price, rating, thumbnail, category },
}) => {
  return (
    <div className='product-details bg-white p-4 rounded'>
      <h2 className='text-xl font-medium mb-3'>{title}</h2>
      <img src={thumbnail} alt='' className='mb-3 object-cover h-48 w-full' />
      <div className='product-text flex flex-col gap-1 text-sm'>
        <p className='description'>{description}</p>
        <p className='price'>
          <span className='font-semibold'>Price:</span> ${price}
        </p>
        <p className='category'>
          <span className='font-semibold'>Category:</span> {category}
        </p>
        <p className='rating'>
          <span className='font-semibold'>Rating:</span> {rating}
        </p>
      </div>
    </div>
  );
};
