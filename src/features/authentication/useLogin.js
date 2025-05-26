import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useLogin() {
	const navigate = useNavigate();

	const { isLoading: isLoggingIn, mutate: login } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			toast.success(`User successfully logged in.`);
			navigate('/dashboard');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isLoggingIn, login };
}
