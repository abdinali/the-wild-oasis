import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useGetBookings() {
	const {
		isLoading,
		error,
		data: bookings,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: getBookings,
	});

	return { isLoading, error, bookings };
}
