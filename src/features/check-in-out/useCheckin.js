import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useCheckin() {
	const navigate = useNavigate();
	const location = useLocation();

	const queryClient = useQueryClient();

	const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in.`);
			queryClient.invalidateQueries({ active: true });
			// redirect back to dashboard if checked-in from dashboard, otherwise redirect to bookings page
			if (location?.state?.from.startsWith('/dashboard')) {
				navigate('/dashboard');
			} else {
				navigate(`/bookings?status=checked-in`);
			}
		},
		onError: () => toast.error('There was an error while checking in.'),
	});

	return { isCheckingIn, checkin };
}
