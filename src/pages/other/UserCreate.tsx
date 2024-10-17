import { Card, Col, Form, Row, Button, Spinner } from 'react-bootstrap'
import { PageBreadcrumb, FormInput } from '@/components'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuthContext } from '@/common'
import Swal from 'sweetalert2'

const schemaResolver = yupResolver(
	yup.object().shape({
		username: yup.string().required('Please enter Username'),
		email: yup
			.string()
			.email('Please enter a valid email')
			.required('Please enter Email'),
		password: yup.string().required('Please enter Password'),
		phone_number: yup.string().required('Please enter Phone Number'),
	})
)

const UserCreate = () => {
	const methods = useForm({ resolver: schemaResolver })
	const { permissions } = useAuthContext()

	const canCreate = permissions.Users?.Create
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = methods

	const [loading, setLoading] = useState(false)
	const [roles, setRoles] = useState<{ _id: string; role_name: string }[]>([]) // Store
	const { user } = useAuthContext()

	const getRoles = async () => {
		try {
			setLoading(true)
			const BASE_API = import.meta.env.VITE_BASE_API
			const yourAuthToken = user.token
			const response = await fetch(`${BASE_API}/api/users/role/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
			})
			if (!response.ok) {
				const error = await response.json()
				const errorMessage = error.message || 'Failed to fetch Role'
				throw new Error(errorMessage)
			}

			if (response.ok) {
				const data = await response.json() // getting user roles name here
				console.log(
					' user data ',
					data.map((item: any) => item.role_name) // item._id
				)

				setRoles(data)
			}
		} catch (error: any) {
			Swal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getRoles()
	}, [])

	const handleFormSubmit = async (data: any) => {
		setLoading(true)
		try {
			// Find the selected role's _id
			const selectedRole = roles.find(
				(role) => role.role_name === data.role_name
			)
			console.log('selected user ', selectedRole)
			console.log('role id ', selectedRole?._id)

			const formattedData = {
				username: data.username,
				email: data.email,
				password: data.password,
				phone_number: data.phone_number,
				userRoleId: selectedRole?._id, // Send _id instead of role_name
			}
			const BASE_API = import.meta.env.VITE_BASE_API
			const yourAuthToken = user.token

			const response = await fetch(`${BASE_API}/api/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
				body: JSON.stringify(formattedData),
			})
			if (!response.ok) {
				const errorMessage = await response.json()
				console.error('API error:', errorMessage)
				throw new Error(errorMessage.message || 'User creation failed')
			}

			await response.json()

			Swal.fire({
				title: 'User Created Successfully!',
				icon: 'success',
				timer: 1500,
			})
			reset()
		} catch (error: any) {
			console.error('Error submitting User form:', error)
			Swal.fire({
				title: 'User Creation Failed!',
				text: error.message,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Add New User" subName="User" />
			<Card>
				<Card.Header>
					<h4 className="header-title">Account</h4>
					<p className="text-muted mb-0">
						Fill in the information below to add a new account
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
									key="username"
									errors={errors}
									control={control}
								/>
							</Col>
							<Col lg={6}>
								<FormInput
									label="Email"
									type="email"
									name="email"
									placeholder="Email"
									containerClass="mb-3"
									register={register}
									key="email"
									errors={errors}
									control={control}
								/>
							</Col>
						</Row>
						<Row>
							<Col lg={6}>
								<FormInput
									label="Phone Number"
									type="text"
									name="phone_number"
									placeholder="Enter Your Phone Number"
									containerClass="mb-3"
									register={register}
									key="phone_number"
									errors={errors}
									control={control}
								/>
							</Col>
							<Col lg={6}>
								<FormInput
									label="Password"
									type="password"
									name="password"
									placeholder="Enter Your Password"
									containerClass="mb-3"
									register={register}
									key="password"
									errors={errors}
									control={control}
								/>
							</Col>
						</Row>
						<Row>
							<Col lg={6}>
								<FormInput
									name="role_name"
									label="Role"
									type="select"
									containerClass="mb-3"
									className="form-select"
									register={register}
									key="role_name"
									errors={errors}
									control={control}
									style={{ maxHeight: '200px', overflowY: 'auto' }} // Ensuring a max height with scroll
								>
									<option value="">Select a Role</option>
									{/* Populate dropdown with role_name */}
									{roles.map((role) => (
										<option key={role._id} value={role.role_name}>
											{role.role_name}
										</option>
									))}
								</FormInput>
							</Col>
						</Row>
						<Button
							type="submit"
							variant="success"
							disabled={loading || !canCreate}>
							Register User
						</Button>
					</Card.Body>
				</Form>
			</Card>
		</>
	)
}

export default UserCreate
