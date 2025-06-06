import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isLoggingOut, mutate: logout } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate('/login', { replace: true });
		},
	});

	return { isLoggingOut, logout };
}
