import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// 1. Calculate the num of bookings
	const numBookings = bookings?.length;

	// 2. Calculate total sales
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// 3. Calculate total check ins
	const checkins = confirmedStays.length;

	// 4. Occupancy rate - num of checked in nights / all available cabin nights
	const occupancyRate =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

	return (
		<>
			<Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupancyRate * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
