import { useDarkMode } from '../context/useDarkMode';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;
