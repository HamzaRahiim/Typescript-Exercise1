import { Button, Col, Row } from 'react-bootstrap'
import AuthLayout from '../AuthLayout'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import { FormInput, VerticalForm, PageBreadcrumb } from '@/components'
import { useState } from 'react'
import Swal from 'sweetalert2'

const BottomLink = () => {
	return (
		<Row>
			<Col xs={12} className="text-center">
				<p className="text-dark-emphasis">
					Back To{' '}
					<Link
						to="/auth/login"
						className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline">
						<b>Log In</b>
					</Link>
				</p>
			</Col>
		</Row>
	)
}
interface UserData {
	email: string
}

const ForgotPassword = () => {
	const schemaResolver = yupResolver(
		yup.object().shape({
			email: yup
				.string()
				.email('Please enter a valid email')
				.required('Please enter email'),
		})
	)

	const [loading, setLoading] = useState(false)

	const onSubmit = async (data: any) => {
		const { email }: any = data
		setLoading(true)
		try {
			const BASE_API = import.meta.env.VITE_BASE_API
			const response = await fetch(
				`${BASE_API}/api/auth/user/forgot-password`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				}
			)
			if (!response.ok) {
				const error = await response.json()
				console.log('error get ', error.message)
				const errorMessage = error.message || 'Failed to send Email.'
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: errorMessage,
				}) // Use Swal.fire here instead of showValidationMessage
				return
			}
			if (response.ok) {
				Swal.fire({
					title: 'Reset Password With OTP',
					html: `
					<p>OTP is being sent to your email. Please enter it below:</p>
					<input id="otp" class="swal2-input" type="text" placeholder="Enter OTP">
					<input id="newPassword" class="swal2-input" type="password" placeholder="Enter New Password">
					<input id="confirmPassword" class="swal2-input" type="password" placeholder="Confirm New Password">
				  `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Reset Password',
					showLoaderOnConfirm: true,
					preConfirm: async () => {
						const otpCode = (document.getElementById('otp') as HTMLInputElement)
							.value!
						const newPassword = (
							document.getElementById('newPassword') as HTMLInputElement
						).value!
						const confirmPassword = (
							document.getElementById('confirmPassword') as HTMLInputElement
						).value!

						// Basic validation
						if (!otpCode || !newPassword || !confirmPassword) {
							Swal.showValidationMessage('All fields are required.')
							return
						}
						if (newPassword !== confirmPassword) {
							Swal.showValidationMessage('Passwords do not match.')
							return
						}

						try {
							const resetUrl = `${BASE_API}/api/auth/user/reset-password`
							const response = await fetch(resetUrl, {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									otpCode: otpCode,
									newPassword: newPassword,
								}),
							})

							const jsonResponse = await response.json()

							if (!response.ok) {
								console.log('Error in response:', jsonResponse)
								const errorMessage =
									jsonResponse.message || 'Failed to reset password'
								return Swal.showValidationMessage(errorMessage)
							}

							return jsonResponse
						} catch (error) {
							Swal.showValidationMessage(
								`Request failed: Please try again later.`
							)
						}
					},
					allowOutsideClick: () => !Swal.isLoading(),
				}).then((result) => {
					if (result.isConfirmed) {
						Swal.fire({
							title: 'Password Reset Successfully',
							icon: 'success',
							showCancelButton: true, // This will add the "Cancel" button
							confirmButtonText: 'Login', // Text for the "Login" button
							cancelButtonText: 'Cancel', // Text for the "Cancel" button
						}).then((result) => {
							if (result.isConfirmed) {
								window.location.href = '/auth/login' // Update the URL to your login page
							}
						})
					}
				})
			}

			console.log('sucess', response)
		} catch (error: any) {
			console.log('error', error)
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Request Failed. Please try again later.',
			}) // Use Swal.fire here instead of showValidationMessage
			return
		} finally {
			setLoading(false)
		}
	}
	return (
		<div>
			<PageBreadcrumb title="Forgot Password" />
			<AuthLayout
				authTitle="Forgot Password?"
				helpText="Enter your email address and we'll send you an OTP to reset your password."
				bottomLinks={<BottomLink />}>
				<VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
					<FormInput
						label="Email address"
						type="email"
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						required
					/>
					<div className="mb-0 text-start">
						<Button
							variant="soft-success"
							className="w-100"
							type="submit"
							disabled={loading}>
							<i className="ri-loop-left-line me-1 fw-bold" />{' '}
							<span className="fw-bold">Send OTP</span>{' '}
						</Button>
					</div>
				</VerticalForm>
			</AuthLayout>

			<BottomLink />
		</div>
	)
}

export default ForgotPassword
