import { Link } from 'react-router-dom'
import { VerifyEmailForm } from '@wasp/auth/forms/VerifyEmail'

export const EmailVerification = () => {
	return (
		<div>
			<VerifyEmailForm />
			<p>If everything is okay, <Link to="/login">go to login</Link></p>
		</div>
	)
}