import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isLoggingIn, mutate: login } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data.user);
			toast.success(`User successfully logged in.`);
			navigate('/dashboard', { replace: true });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isLoggingIn, login };
}
