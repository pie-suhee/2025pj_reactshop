import React, { Suspense, useEffect } from 'react';
import { Product, fetchProducts } from '../store/searchSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ProductsLoad from './ProductsLoad';

type Items = {
  title?: string;
  limit?: number;
  data?: Array<Product>;
  scroll?: boolean;
} & typeof defaultProps;

const defaultProps = {
  title: '',
  limit: 4,
  data: [],
  scroll: false,
};

const ItemList = ({ title, limit, scroll }: Items): JSX.Element => {
  const ProductsList = React.lazy(() => import('./ProductsList'));
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.search.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);
  let filtered = products;

  switch (title) {
    case '패션':
      filtered = filtered.filter((item) => item.category === "men's clothing" || item.category === "women's clothing").slice(0, limit);
      break;
    case '액세서리':
      filtered = filtered.filter((item) => item.category === 'jewelery').slice(0, limit);
      break;
    case '디지털':
      filtered = filtered.filter((item) => item.category === 'electronics').slice(0, limit);
      break;
    default:
      filtered = filtered.slice(0, limit);
      break;
  }
  return (
    <>
      <h2 className='mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold'>{title}</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list' data-scroll={scroll}>
        <Suspense fallback={<ProductsLoad limit={limit} />}>
          <ProductsList products={filtered} limit={limit} />
        </Suspense>
      </div>
    </>
  );
};

ItemList.defaultProps = defaultProps;

export default ItemList;
