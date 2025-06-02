import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirm = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function Confirm({ operation, resourceName, onConfirm, disabled, onCloseModal }) {
	return (
		<StyledConfirm>
			<Heading as="h3">
				{operation} {resourceName}
			</Heading>
			{operation === 'Delete' ? (
				<p>
					Are you sure you want to delete <strong>{resourceName}</strong> permanently? This action
					cannot be undone.
				</p>
			) : (
				<p>
					Are you sure you want to duplicate <strong>{resourceName}</strong>?
				</p>
			)}

			<div>
				<Button $variation="secondary" disabled={disabled} onClick={onCloseModal}>
					Cancel
				</Button>
				<Button
					$variation={operation === 'Delete' ? 'danger' : 'primary'}
					disabled={disabled}
					onClick={onConfirm}
				>
					{operation}
				</Button>
			</div>
		</StyledConfirm>
	);
}

export default Confirm;
