import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { toCurrencyFormat } from '../helpers/helpers';
import type { Product } from '../store/searchSlice';

type CartItemData = Product & { count: number };

type Item = {
  data?: CartItemData;
} & typeof defaultProps;

const defaultProps = {
  data: {} as CartItemData,
};

const CartList = ({ data }: Item): JSX.Element => {
  const dispatch = useAppDispatch();

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = (id: number) => {
    dispatch(addToCart(id));
  };

  return (
    <div className='lg:flex lg:items-center mt-4 px-2 lg:px-0'>
      <Link to={`/product/${data.id}`}>
        <figure className='w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white'>
          <img src={data.image} alt={data.title} className='object-contain w-full h-48' />
        </figure>
      </Link>
      <div className='card-body px-1 lg:px-12'>
        <h2 className='card-title'>
          <Link to={`/product/${data.id}`} className='link link-hover'>
            {data.title}
          </Link>
        </h2>
        <p className='mt-2 mb-4 text-3xl'> {toCurrencyFormat(data.price)}</p>
        <div className='card-actions'>
          <div className='btn-group'>
            <button className='btn btn-primary' onClick={() => removeFromCartHandler(parseInt(String(data.id)))}>
              -
            </button>
            <button className='btn btn-ghost no-animation'>{data.count}</button>
            <button className='btn btn-primary' onClick={() => addToCartHandler(parseInt(String(data.id)))}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartList.defaultProps = defaultProps;

export default CartList;