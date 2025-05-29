import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { isSigningUp, signup } = useSignup();

	const {
		register,
		formState: { errors },
		getValues,
		handleSubmit,
		reset,
	} = useForm();

	function onSubmit({ fullName, email, password }) {
		signup({ fullName, email, password }, { onSettled: () => reset() });
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, (error) => {
				console.error('Error:', error);
			})}
		>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					disabled={isSigningUp}
					{...register('fullName', { required: 'This field is required.' })}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isSigningUp}
					{...register('email', {
						required: 'This field is required.',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Please provide a valid email address.',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
				<Input
					type="password"
					id="password"
					disabled={isSigningUp}
					{...register('password', {
						required: 'This field is required.',
						minLength: { value: 8, message: 'Password needs a minimum of 8 characters.' },
					})}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSigningUp}
					{...register('passwordConfirm', {
						required: 'This field is required.',
						validate: (value) => value === getValues().password || 'Passwords do not match.',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset" onClick={reset}>
					Cancel
				</Button>
				<Button disabled={isSigningUp}>Create New User</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
