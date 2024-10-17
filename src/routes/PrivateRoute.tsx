import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../common/context'

const PrivateRoute = ({ children, requiredPermission, to_do }: any) => {
	const { permissions, isAuthenticated, isSuperUser } = useAuthContext()

	// Check if the user is authenticated
	if (!isAuthenticated) {
		return <Navigate to="/auth/login" />
	}

	// If the user is a superuser, allow access to all routes
	if (isSuperUser) {
		return children
	}

	// Check if the user has the required permission
	if (permissions[requiredPermission][to_do] === false) {
		return <Navigate to="/not-authorize" />
	}

	// If everything is fine, render the children (protected component)
	return children
}

export default PrivateRoute
