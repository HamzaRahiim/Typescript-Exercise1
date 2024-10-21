import { useAuthContext } from '@/common'
import { PageBreadcrumb } from '@/components'
import { useState, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'

const BasicSetting = () => {
	const BASE_API = import.meta.env.VITE_BASE_API
	const { user, isSuperUser, permissions } = useAuthContext()
	const { token } = user

	const canUpdate = isSuperUser || permissions.Settings?.Update
	const [loading, setLoading] = useState<boolean>(true)

	const [isOtpEnabled, setIsOtpEnabled] = useState<boolean>(false)

	// Fetch the current state of 2FA from the API
	useEffect(() => {
		const fetchOtpStatus = async () => {
			try {
				setLoading(true)
				const response = await fetch(`${BASE_API}/api/users/two-factor-auth`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				if (!response.ok) {
					throw new Error('Failed to fetch 2FA status.')
				}

				const data = await response.json()
				setIsOtpEnabled(data.twoFactorAuthEnabled)
			} catch (error: any) {
				console.error('Error fetching OTP status:', error.message)
				Swal.fire({
					title: 'Oops!',
					text: 'Failed to load OTP status!',
					icon: 'error',
					timer: 1500,
				})
			} finally {
				setLoading(false)
			}
		}

		// Call the function to fetch the current OTP status
		fetchOtpStatus()
	}, [BASE_API, token])

	// Toggle handler
	const handleToggle = () => {
		const newState = !isOtpEnabled
		setIsOtpEnabled(newState)
		handleSubmitFunction(newState)
	}

	// API function for updating OTP status
	const handleSubmitFunction = async (enabled: boolean) => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/users/toggle-2fa`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ enabled }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				const errorMessage =
					errorData.message || 'An error occurred while updating OTP status.'
				throw new Error(errorMessage)
			}

			Swal.fire({
				title: 'OTP Status Updated!',
				text: 'OTP status has been updated successfully!',
				icon: 'success',
				timer: 1500,
			})
		} catch (error: any) {
			console.error('Error updating OTP status:', error.message)
			Swal.fire({
				title: 'Oops!',
				text: 'OTP status has not been updated successfully!',
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center "
				style={{ height: '100vh' }}>
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
			</div>
		)
	}
	return (
		<>
			<PageBreadcrumb title="Basic Settings" subName="Settings" />
			<Card>
				<Card.Header>
					<h3>OTP Functionality</h3>
					<p>Two-Factor Authentication</p>
				</Card.Header>
				<Card.Body>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div className="toggle-container" style={{ marginRight: '10px' }}>
							<label className="toggle">
								<input
									type="checkbox"
									id="otp-toggle"
									checked={isOtpEnabled}
									onChange={handleToggle}
									disabled={!canUpdate}
								/>
								<span className="slider"></span>
								<span className="text on">ON</span>
								<span className="text off">OFF</span>
							</label>
						</div>
						<div className="info-text">
							<p style={{ margin: 0 }}>
								Two-Factor Authentication (2FA) adds an extra layer of security
								to your customer login by requiring a one-time password.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

export default BasicSetting
