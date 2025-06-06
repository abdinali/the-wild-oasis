import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Confirm from '../../ui/Confirm';
import Empty from '../../ui/Empty';
import CheckoutButton from '../check-in-out/CheckoutButton';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from './useGetBooking';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useGetBooking();
	const { isDeleting, deleteBooking } = useDeleteBooking();

	const moveBack = useMoveBack();

	const navigate = useNavigate();

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resource="booking" />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === 'unconfirmed' && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
				)}
				{status === 'checked-in' && (
					<CheckoutButton bookingId={bookingId}>Check out</CheckoutButton>
				)}
				<Modal>
					<Modal.Open opens="confirm-delete">
						<Button $variation="danger">Delete Booking</Button>
					</Modal.Open>
					{/* modal to confirm deleting a booking */}
					<Modal.Window name="confirm-delete">
						<Confirm
							operation="Delete"
							resourceName={`Booking ${bookingId}`}
							onConfirm={() => deleteBooking(bookingId, { onSettled: () => navigate(-1) })}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
