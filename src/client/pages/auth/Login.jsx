import { Link } from 'react-router-dom'
import { LoginForm } from '@wasp/auth/forms/Login'

const Login = () => {
	return (
		<div style={{ maxWidth: '400px', margin: '0 auto' }}>
			<LoginForm />
			<p>Don't have an account yet? <Link to="/signup">go to signup</Link>.</p>
			<p>Forgot your password?{' '} <Link to="/request-password-reset">reset it</Link>.</p>
		</div>
	)
}

export default Login;