import { useSearchParams } from 'react-router-dom';
import { useGetCabins } from './useGetCabins';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

function CabinTable() {
	const { isLoading, cabins } = useGetCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resource="cabins" />;

	// 1. Filter
	const filterValue = searchParams.get('discount') || 'all';

	let filteredCabins;

	if (filterValue === 'all') filteredCabins = cabins;
	if (filterValue === 'no-discount')
		filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
	if (filterValue === 'with-discount')
		filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

	// 2. Sort
	const sortBy = searchParams.get('sortBy') || 'name-asc';
	const [field, sortingOrder] = sortBy.split('-');

	const modifier = sortingOrder === 'asc' ? 1 : -1;

	const sortedFilteredCabins = filteredCabins?.sort((a, b) => {
		if (typeof a[field] === 'string') {
			return a[field].localeCompare(b[field]) * modifier;
		} else {
			return a[field] - b[field] * modifier;
		}
	});

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Max Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedFilteredCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
