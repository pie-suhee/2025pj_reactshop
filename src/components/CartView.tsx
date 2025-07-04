import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, Product } from '../store/searchSlice';
import { toCurrencyFormat } from '../helpers/helpers';
import BreadCrumb from './Breadcrumb';
import CartList from './CartList';
import Confirm from './Confirm';
import ProductsViewLoad from './ProductsViewLoad';

const CartView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.search.products);
  const cartItemsState = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const cartItems = cartItemsState.map((item) => {
    const product = products.find((p) => p.id === item.id) as Product | undefined;
    return product ? { ...product, count: item.count } : ({ id: item.id, count: item.count } as any);
  });

  const totalPrice = cartItems.reduce(
    (total, item: any) => total + (item.price || 0) * item.count,
    0
  );

  if (products.length === 0) {
    return <ProductsViewLoad />;
  }

  return (
    <>
      <BreadCrumb category='홈' crumb='장바구니' />
      <div className='mt-6 md:mt-14 px-2 lg:px-0'>
        {cartItems.length <= 0 && (
          <div>
            <h1 className='text-2xl'>장바구니에 물품이 없습니다.</h1>
            <Link to='/' className='btn btn-primary mt-10'>
              담으러 가기
            </Link>
          </div>
        )}
        <div className='lg:flex justify-between mb-20'>
          <div>
            {0 < cartItems.length
              ? cartItems.map((cart) => {
                  const data: any = cart || {};
                  return <CartList key={cart.id} data={data} />;
                })
              : ''}
          </div>
          <div className='self-start shrink-0 flex items-center mt-10 mb-20'>
            <span className='text-xl md:text-2xl'>총 : {toCurrencyFormat(totalPrice)}</span>
            <label htmlFor='confirm-modal' className='modal-button btn btn-primary ml-5'>
              구매하기
            </label>
          </div>
        </div>
      </div>
      <Confirm />
    </>
  );
};

export default CartView;
