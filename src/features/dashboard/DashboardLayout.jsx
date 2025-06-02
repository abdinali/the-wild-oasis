import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useGetCabins } from '../cabins/useGetCabins';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
	const { isLoading: isLoadingStays, stays, confirmedStays, numDays } = useRecentStays();
	const { isLoading: isLoadingCabins, cabins } = useGetCabins();

	if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<div>Today&apos;s activity</div>
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
