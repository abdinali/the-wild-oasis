import { useCheckout } from './useCheckOut';
import Button from '../../ui/Button';

function CheckoutButton({ bookingId, onClick }) {
	const { isCheckingOut, checkout } = useCheckout();

	return (
		<Button
			onClick={onClick ? onClick : () => checkout(bookingId)}
			disabled={isCheckingOut}
			variation="primary"
			size="small"
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
