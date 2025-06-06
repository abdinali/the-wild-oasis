import { useLogout } from './useLogout';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
	const { isLoggingOut, logout } = useLogout();

	return (
		<ButtonIcon onClick={logout} disabled={isLoggingOut}>
			{!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}

export default Logout;
