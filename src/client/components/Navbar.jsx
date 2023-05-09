import logout from '@wasp/auth/logout';

export function Navbar() {
	return (
		<div>
			<button onClick={logout}>Logout</button>
		</div>
	)
}