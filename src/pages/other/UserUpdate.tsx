import { Card, Col, Form, Row, Button, Spinner } from 'react-bootstrap'
import { PageBreadcrumb, FormInput } from '@/components'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuthContext } from '@/common'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

// Schema for form validation
const schema = yup.object().shape({
	username: yup.string().required('Please enter Username'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter Email'),
	phone_number: yup.string().required('Please enter Phone Number'),
	role_name: yup.string().required('Please select a Role'),
	password: yup.string().required('Please enter Password'),
})

const UserUpdate = () => {
	const { id } = useParams()
	const { user } = useAuthContext()
	const { token } = user
	const BASE_API = import.meta.env.VITE_BASE_API

	const [roles, setRoles] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const methods = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username: '',
			email: '',
			phone_number: '',
			role_name: '', // initial value for role
			password: '',
		},
	})

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = methods

	// Fetch user data and roles
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				// Fetch roles
				const rolesResponse = await fetch(`${BASE_API}/api/users/role/`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
				const rolesData = await rolesResponse.json()
				setRoles(rolesData)

				// Fetch user data by ID
				const userResponse = await fetch(`${BASE_API}/api/users/${id}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				const userData = await userResponse.json()
				setValue('username', userData.username)
				setValue('email', userData.email)
				setValue('phone_number', userData.phone_number)
				setValue('role_name', userData.role._id) // Set role by ID
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id, token, setValue])

	// Handle form submission
	const handleFormSubmit = async (data: any) => {
		try {
			console.log('data direct  from form ', data)

			const formattedData = {
				username: data.username,
				email: data.email,
				password: data.password,
				phone_number: data.phone_number,
				userRoleId: data.role_name, // Send _id instead of role_name
			}

			console.log('data before sending to api ', formattedData)

			const response = await fetch(`${BASE_API}/api/users/${id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formattedData),
			})

			if (!response.ok) throw new Error('Failed to update user.')

			console.log('User updated successfully:', await response.json())
			Swal.fire({
				title: 'Success!',
				text: 'User updated successfully',
				icon: 'success',
				confirmButtonText: 'OK',
				timer: 1500,
			})
		} catch (error) {
			console.error('Error updating user:', error)
			Swal.fire({
				title: 'Error!',
				text: 'Failed to update user',
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
			<PageBreadcrumb title="Update User Info" subName="User" />
			<Card>
				<Card.Header>
					<h4 className="header-title">Account</h4>
					<p className="text-muted mb-0">
						Fill in the information below to update user information.
					</p>
				</Card.Header>
				<Form onSubmit={handleSubmit(handleFormSubmit)}>
					<Card.Body>
						<Row>
							<Col lg={6}>
								<FormInput
									label="Name"
									type="text"
									name="username"
									placeholder="Enter Your Name"
									containerClass="mb-3"
									register={register}
									errors={errors}
								/>
							</Col>
							<Col lg={6}>
								<FormInput
									label="Email"
									type="email"
									name="email"
									placeholder="Enter Your Email"
									register={register}
									containerClass="mb-3"
									errors={errors}
								/>
							</Col>
						</Row>
						<Row>
							<Col lg={6}>
								<FormInput
									label="Phone Number"
									type="number"
									name="phone_number"
									placeholder="Enter Your Phone Number"
									register={register}
									containerClass="mb-3"
									errors={errors}
								/>
							</Col>
							<Col lg={6}>
								<FormInput
									label="Role"
									name="role_name"
									type="select"
									register={register}
									containerClass="mb-3"
									errors={errors}>
									<option value="">Select a Role</option>
									{roles.map((role) => (
										<option key={role._id} value={role._id}>
											{role.role_name}
										</option>
									))}
								</FormInput>
							</Col>
						</Row>
						<Row>
							<Col lg={6}>
								<FormInput
									label="Password"
									type="password"
									name="password"
									placeholder="Enter Your Password"
									register={register}
									containerClass="mb-3"
									errors={errors}
								/>
							</Col>
						</Row>
						<Button type="submit" variant="success" disabled={loading}>
							Update User
						</Button>
					</Card.Body>
				</Form>
			</Card>
		</>
	)
}

export default UserUpdate