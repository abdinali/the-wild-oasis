import styled from 'styled-components';
import { useDeleteCabin } from './useDeleteCabin';
import { formatCurrency } from '../../utils/helpers';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { HiSquare2Stack } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Confirm from '../../ui/Confirm';
import Table from '../../ui/Table';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}

	if (isCreating) return <Spinner />;
	return (
		<Table.Row role="row">
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>{maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
			<div>
				<Modal>
					{/* modal to confirm duplicating a cabin */}
					<Modal.Open opens="confirm-duplicate">
						<Button size="small">
							<HiSquare2Stack></HiSquare2Stack>
						</Button>
					</Modal.Open>
					<Modal.Window name="confirm-duplicate">
						<Confirm
							operation="Duplicate"
							resourceName={`Cabin ${name}`}
							onConfirm={handleDuplicate}
							disabled={isCreating}
						/>
					</Modal.Window>

					{/* modal for editing a cabin */}
					<Modal.Open opens="edit-form">
						<Button size="small">
							<BiEdit></BiEdit>
						</Button>
					</Modal.Open>
					<Modal.Window name="edit-form">
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>

					{/* modal to confirm deleting a cabin */}
					<Modal.Open opens="confirm-delete">
						<Button size="small">
							<BiTrash></BiTrash>
						</Button>
					</Modal.Open>
					<Modal.Window name="confirm-delete">
						<Confirm
							operation="Delete"
							resourceName={`Cabin ${name}`}
							onConfirm={() => deleteCabin(cabinId)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;
