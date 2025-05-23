import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGetBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// 1. FILTER
	const filterValue = searchParams.get('status') || 'all';
	const filter =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

	// 2. SORT
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	// 3. PAGINATION
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// QUERY
	const {
		isLoading,
		error,
		data: { bookings = [], count = 0 } = {},
	} = useQuery({
		queryKey: ['bookings', { filter }, { sortBy }, { page }],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);
	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', { filter }, { sortBy }, { page: page + 1 }],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	// PREVIOUS PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', { filter }, { sortBy }, { page: page - 1 }],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});
	return { isLoading, error, bookings, count };
}
