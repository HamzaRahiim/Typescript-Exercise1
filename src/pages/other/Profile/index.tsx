import {
	Button,
	Card,
	Col,
	Form,
	Nav,
	Row,
	Spinner,
	Tab,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import bgProfile from '@/assets/images/bg-profile.jpg'
import { FormInput } from '@/components'
import { useAuthContext } from '@/common'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'

// Define types for user info and form data
interface UserInfo {
	username: string
	email: string
	phone_number: string
	role: string
}

interface FormData {
	username: string
	email: string
	phone_number: string
}

const ProfilePages = () => {
	const BASE_API = import.meta.env.VITE_BASE_API
	const { user } = useAuthContext()
	const { token } = user
	const methods = useForm()
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = methods

	// State variables
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [apiLoadinng, setApiLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState<FormData>({
		username: '',
		email: '',
		phone_number: '',
	})

	// Fetch user data from API
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				setLoading(true)

				const response = await fetch(`${BASE_API}/api/users/me`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})

				// Handle unsuccessful response
				if (!response.ok) {
					throw new Error('Failed to fetch user info')
				}

				const data = await response.json()
				if (data) {
					setUserInfo({
						username: data.username || 'N/A',
						email: data.email || 'N/A',
						phone_number: data.phone_number || 'N/A',
						role: data.role.role_name || 'N/A',
					})
					setFormData({
						username: data.username || '',
						email: data.email || '',
						phone_number: data.phone_number || '',
					})
				}
			} catch (error) {
				console.error('Error fetching user info:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchUserInfo()
	}, [token])

	// Handle form field changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	// Submit updated user info
	const handleSubmitInfo = async (e: React.FormEvent) => {
		e.preventDefault()

		// Log form data before submitting
		console.log('Submitting User Info:', formData)
		setApiLoading(true)

		try {
			const response = await fetch(`${BASE_API}/api/users/update-info`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error('Failed to update user info')
			}

			const data = await response.json()
			if (data) {
				Swal.fire({
					title: 'Success!',
					text: 'Info updated successfully',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
			}
			console.log('User Info updated:', data)
		} catch (error) {
			console.error('Error updating user info:', error)
			Swal.fire({
				title: 'Error!',
				text: 'Failed to update info',
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}
	}

	const handlePasswordSubmit = async (data: any) => {
		console.log('data pass ', data)
		setApiLoading(true)

		try {
			const response = await fetch(`${BASE_API}/api/users/me/password`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					currentPassword: data.currentPassword,
					newPassword: data.newPassword,
				}),
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to update password')
			}

			const data_res = await response.json()
			if (data_res) {
				Swal.fire({
					title: 'Success!',
					text: 'Password updated successfully',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
			}
		} catch (error: any) {
			console.error('Error updating user Password:', error)
			Swal.fire({
				title: 'Error!',
				text: error,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}
	}
	// Conditional rendering for loading state
	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: '100vh' }}>
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
			</div>
		)
	}

	return (
		<>
			<div>
				<Row>
					<Col sm={12}>
						<div
							className="profile-bg-picture"
							style={{ backgroundImage: `url(${bgProfile})` }}>
							<span className="picture-bg-overlay" />
						</div>
						<div className="profile-user-box">
							<Row>
								<Col sm={6}>
									<div>
										<h4 className="mt-4 fs-17 ellipsis">
											{userInfo?.username || 'User Name'}
										</h4>
										<p className="font-13">{userInfo?.role || 'Role'}</p>
										<p className="text-muted mb-0">
											<small>Pakistan</small>
										</p>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				{/* Profile Content */}
				<Row>
					<Col sm={12}>
						<Card className="p-0">
							<Card.Body className="p-0">
								<div className="profile-content">
									<Tab.Container defaultActiveKey="About">
										<Nav as="ul" justify className="nav-underline gap-0">
											<Nav.Item as="li">
												<Nav.Link
													as={Link}
													to="#"
													eventKey="About"
													type="button">
													About
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													as={Link}
													to="#"
													eventKey="Settings"
													type="button">
													Settings
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													as={Link}
													to="#"
													eventKey="ChangePassword"
													type="button">
													Change Password
												</Nav.Link>
											</Nav.Item>
										</Nav>

										<Tab.Content className="m-0 p-4">
											{/* About Section */}
											<Tab.Pane eventKey="About">
												<div className="profile-desk">
													<h5 className="text-uppercase fs-17 text-dark">
														{userInfo?.username || 'User Name'}
													</h5>
													<div className="designation mb-4">
														{userInfo?.role || 'Role Name'}
													</div>
													<h5 className="mt-4 fs-17 text-dark">
														Contact Information
													</h5>
													<table className="table table-condensed mb-0 border-top">
														<tbody>
															<tr>
																<th scope="row">Email</th>
																<td>
																	<Link to="" className="ng-binding">
																		{userInfo?.email || 'user email'}
																	</Link>
																</td>
															</tr>
															<tr>
																<th scope="row">Phone</th>
																<td className="ng-binding">
																	{userInfo?.phone_number ||
																		'user phone number'}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</Tab.Pane>

											{/* Settings Section */}
											<Tab.Pane eventKey="Settings">
												<form onSubmit={handleSubmitInfo}>
													<Row>
														<FormInput
															name="username"
															label="Full Name"
															type="text"
															containerClass="mb-2"
															value={formData.username}
															onChange={handleInputChange}
														/>
														<FormInput
															name="email"
															label="Email"
															type="email"
															containerClass="mb-3"
															value={formData.email}
															onChange={handleInputChange}
														/>
														<FormInput
															name="phone_number"
															label="Phone Number"
															type="text"
															containerClass="mb-3"
															value={formData.phone_number}
															onChange={handleInputChange}
														/>
													</Row>
													<Button
														variant="success"
														type="submit"
														disabled={apiLoadinng}>
														Save
													</Button>
												</form>
											</Tab.Pane>

											{/* Change Password Section */}
											<Tab.Pane eventKey="ChangePassword">
												<Form onSubmit={handleSubmit(handlePasswordSubmit)}>
													<Row>
														<Col xs={12} sm={6}>
															<FormInput
																label={'Current Password'}
																containerClass="mb-3"
																placeholder="Enter Current Password"
																type="password"
																name="currentPassword"
																register={register}
																errors={errors}
																control={control}
															/>
														</Col>
														<Col xs={12} sm={6}>
															<FormInput
																label={'New Password'}
																placeholder="Enter New Password"
																containerClass="mb-3"
																type="password"
																name="newPassword"
																register={register}
																errors={errors}
																control={control}
															/>
														</Col>
													</Row>
													<Button
														type="submit"
														disabled={apiLoadinng}
														variant="success">
														Change Password
													</Button>
												</Form>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default ProfilePages