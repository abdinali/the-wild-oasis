import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSignup() {
	const { isLoading: isSigningUp, mutate: signup } = useMutation({
		mutationFn: signupApi,
		onSuccess: () => {
			toast.success(
				"Account successfully created! Please verify the new account with the link sent to the new user's email address."
			);
		},
	});

	return { isSigningUp, signup };
}
