import { useGetCabins } from './useGetCabins';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

function CabinTable() {
	const { isLoading, cabins } = useGetCabins();
	if (isLoading) return <Spinner />;
	return (
		<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header role="row">
				<div></div>
				<div>Cabin</div>
				<div>Max Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			<Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
		</Table>
	);
}

export default CabinTable;
