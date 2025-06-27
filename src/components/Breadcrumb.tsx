import React from 'react';

export const Category = {
  "men's clothing": '패션',
  "women's clothing": '패션',
  electronics: '디지털',
  jewelery: '액세서리',
} as const;

type categoryType = typeof Category[keyof typeof Category];

type BreadCrumbs = {
  category?: string;
  crumb?: string;
};

const defaultProps = {
  category: '',
  crumb: '',
};

const BreadCrumb = ({ category, crumb }: BreadCrumbs): JSX.Element => {
  return (
    <div className='text-sm breadcrumbs'>
      <ul>
        <li>{!!Category[category as keyof typeof Category] ? Category[category as keyof typeof Category] : category}</li>
        <li>{crumb}</li>
      </ul>
    </div>
  );
};

BreadCrumb.defaultProps = defaultProps;

export default BreadCrumb;