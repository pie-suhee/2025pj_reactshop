import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, setQuery } from '../store/searchSlice';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { products, query } = useAppSelector((state) => state.search);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filtered = query
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const toggleMobile = () => {
    setOpen((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className='dropdown'>
      <button
        type='button'
        className='flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search'
        onClick={toggleMobile}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 stroke-gray-700 dark:stroke-white'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </button>
      <input
        ref={inputRef}
        type='text'
        placeholder='검색'
        className={`fixed left-0 top-16 ${
          open ? 'z-10 opacity-100' : '-z-10 opacity-0'
        } sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput`}
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      {filtered.length > 0 && (
        <ul
          className={`!fixed left-0 sm:!absolute sm:top-14 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-x-hidden bg-white dark:bg-gray-600 ${
            open ? '!block z-10' : 'hidden -z-10 sm:!block sm:z-10'
          }`}
        >
          {filtered.map((item) => (
            <Link 
              to={`/product/${item.id}`} 
              onClick={(e) => {
                (e.currentTarget as HTMLAnchorElement).blur();
                inputRef.current?.blur();
                setOpen(false);
              }}
            >
              <li key={item.id} className='js-searchedItem'>
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
};

export default Search;