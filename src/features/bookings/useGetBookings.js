import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useGetBookings() {
	const [searchParams] = useSearchParams();

	// 1. FILTER
	const filterValue = searchParams.get('status') || 'all';
	const filter =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

	// 2. SORT
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	const {
		isLoading,
		error,
		data: bookings,
	} = useQuery({
		queryKey: ['bookings', { filter }, { sortBy }],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, error, bookings };
}
