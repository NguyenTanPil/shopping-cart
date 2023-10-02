import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/shoppingCartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
	isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
	const { closeCart, cartItems } = useShoppingCart();

	return (
		<Offcanvas
			show={isOpen}
			placement='end'
			onHide={closeCart}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItem
							key={item.id}
							{...item}
						/>
					))}
					<div className='ms-auto fw-bold fs-5'>
						Total{' '}
						{formatCurrency(
							cartItems.reduce((total, item) => {
								const cartItem = storeItems.find((item) => item.id);

								return total + (cartItem?.price || 0) * item.quantity;
							}, 0),
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
