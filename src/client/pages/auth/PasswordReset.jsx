import { Link } from 'react-router-dom'
import { ResetPasswordForm } from '@wasp/auth/forms/ResetPassword'

export function PasswordReset() {
	return (
		<div>
			<ResetPasswordForm />
			<p>If everything is okay, <Link to="/login">go to login</Link></p>
		</div>
	)
}