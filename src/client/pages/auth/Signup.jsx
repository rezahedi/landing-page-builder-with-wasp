import { Link } from 'react-router-dom'
import { SignupForm } from '@wasp/auth/forms/Signup'

const Signup = () => {
	return (
		<div style={{ maxWidth: '400px', margin: '0 auto' }}>
			<SignupForm />
			<p>I already have an account (<Link to="/login">go to login</Link>).</p>
		</div>
	)
}

export default Signup;