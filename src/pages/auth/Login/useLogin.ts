import { useAuthContext } from '@/common'
import { UserData } from '@/types'
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const location = useLocation()

	const { isAuthenticated, saveSession } = useAuthContext()

	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	)

	const login = async ({ email, password }: UserData) => {
		setError(null)
		setLoading(true)
		try {
			const BASE_API = import.meta.env.VITE_BASE_API
			const response = await fetch(`${BASE_API}/api/auth/admin/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Login failed')
			}

			const data = await response.json()

			if (data.token) {
				setSuccess(true)
				const userSession = {
					is_superuser: data.user.is_superuser,
					permissions: data.user.role.permissions,
					token: data.token,
					username: data.user.username,
					role: data.user.role.role_name,
				}
				console.log(
					' data saving in local before in uselogin page',
					userSession
				)

				saveSession(userSession)
				return { success: true, message: 'Login successful' }
			}
			return { success: false, message: 'Login failed' }
		} catch (error: any) {
			setError(error.message)
			return { success: false, message: error.message }
		} finally {
			setLoading(false)
		}
	}
	return { loading, login, redirectUrl, isAuthenticated, error, success }
}
