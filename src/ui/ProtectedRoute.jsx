import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '../features/authentication/useGetUser';
import Spinner from './Spinner';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 1. Load the authenticatd user
	const { isLoading, isAuthenticated } = useGetUser();

	// 2. If there ISN'T an authenticated user, redirect to the login page
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) {
				navigate('/login');
			}
		},
		[isAuthenticated, isLoading, navigate]
	);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}

export default ProtectedRoute;
