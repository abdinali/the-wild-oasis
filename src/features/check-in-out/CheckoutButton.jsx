import Button from '../../ui/Button';

function CheckoutButton({ onClick, disabled = false }) {
	return (
		<Button onClick={onClick} disabled={disabled} variation="primary" size="small">
			Check out
		</Button>
	);
}

export default CheckoutButton;
