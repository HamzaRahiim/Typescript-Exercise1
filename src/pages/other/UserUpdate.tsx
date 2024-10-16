import { Card, Col, Form, Row, Button, Table, Toast } from 'react-bootstrap'
import { PageBreadcrumb, FormInput } from '@/components'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { PermissionTypes, Permissions } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuthContext } from '@/common'
import { useParams } from 'react-router-dom'
const schemaResolver = yupResolver(
	yup.object().shape({
		username: yup.string().required('Please enter Username'),
		email: yup
			.string()
			.email('Please enter a valid email')
			.required('Please enter Email'),
		password: yup.string().required('Please enter Password'),
		phone_number: yup.string().required('Please enter Phone Number'),
		role_name: yup.string().required('Please enter Role Name'),
	})
)

const UserUpdate = () => {
	const methods = useForm({ resolver: schemaResolver })
	const { id } = useParams()
	const { user } = useAuthContext()
	console.log(' getting id ', id)

	const {
		handleSubmit,
		register,
		control,
		reset,
		setValue,
		formState: { errors },
	} = methods
	useEffect(() => {
		const BASE_API = import.meta.env.VITE_BASE_API

		const yourAuthToken = user.token
		const fetchUserData = async () => {
			try {
				const response = await fetch(`${BASE_API}/api/users/${id}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${yourAuthToken}`,
					},
				})
				const userData = await response.json()
				console.log(' data from api response ', userData)

				if (!response.ok) {
					const errorMessage = await response.json()
					throw new Error(errorMessage.message || 'User get failed')
				}
				// setValue('username', userData.username)
				// setValue('email', userData.email)
				// setValue('phone_number', userData.phone_number)
				// setValue('role_name', userData.role.role_name)
				// setPermissions(userData.role.permissions)
			} catch (error) {
				console.error('Error fetching user data: ', error)
			}
		}
		fetchUserData()
	}, [id, setValue])

	const [loading, setLoading] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const [toastVariant, setToastVariant] = useState('success')
	const [permissions, setPermissions] = useState<Permissions>({
		Users: { Create: false, View: false, Update: false, Delete: false },
		Category: { Create: false, View: false, Update: false, Delete: false },
		Products: { Create: false, View: false, Update: false, Delete: false },
		Inventory: { Create: false, View: false, Update: false, Delete: false },
		WareHouse: { Create: false, View: false, Update: false, Delete: false },
	})

	const handlePermissionChange = (
		page: keyof Permissions,
		permissionType: PermissionTypes
	) => {
		setPermissions((prevPermissions) => ({
			...prevPermissions,
			[page]: {
				...prevPermissions[page],
				[permissionType]: !prevPermissions[page][permissionType],
			},
		}))
	}

	// const handleFormSubmit = async (data: any) => {
	// 	if (!checkPermissions('Users', 'Create')) {
	// 		setToastMessage('You do not have permission to create users')
	// 		setToastVariant('danger')
	// 		setShowToast(true)
	// 		return
	// 	}
	// 	setLoading(true)
	// 	try {
	// 		const formattedData = {
	// 			username: data.username,
	// 			email: data.email,
	// 			password: data.password,
	// 			phone_number: data.phone_number,
	// 			role_name: data.role_name,
	// 			permissions,
	// 		}
	// 		const BASE_API = import.meta.env.VITE_BASE_API

	// 		const yourAuthToken = user.token

	// 		const response = await fetch(`${BASE_API}/api/users`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${yourAuthToken}`,
	// 			},
	// 			body: JSON.stringify(formattedData),
	// 		})
	// 		if (!response.ok) {
	// 			const errorMessage = await response.json()
	// 			console.error('API error:', errorMessage)
	// 			throw new Error(errorMessage.message || 'User creation failed')
	// 		}

	// 		await response.json()
	// 		setLoading(false)
	// 		setToastMessage('User created successfully!')
	// 		setToastVariant('success')
	// 		setShowToast(true)
	// 		reset()
	// 	} catch (error: any) {
	// 		console.error('Error submitting User form:', error)
	// 		setToastMessage(error.message || 'User creation failed')
	// 		setShowToast(true)
	// 		setToastVariant('danger')
	// 		setLoading(false)
	// 	}
	// }
	const handleFormSubmit = (data: any) => {
		console.log('Form data:', data)
	}

	return (
		<>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<PageBreadcrumb title="Update User Info" subName="User" />
				<Card>
					<Card.Header>
						<h4 className="header-title">Account</h4>
						<p className="text-muted mb-0">
							Fill in the information below to Update user Information.
						</p>
					</Card.Header>
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
									name="select"
									label="Input Select"
									type="select"
									containerClass="mb-3"
									className="form-select"
									register={register}
									key="select"
									errors={errors}
									control={control}>
									<option defaultValue="selected">Users</option>
									<option>Manager</option>
									<option>Financial</option>
									<option>Inventory</option>
								</FormInput>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				<Card>
					<Card.Header>
						<h4 className="header-title mt-5 mt-lg-0">Permission</h4>
						<p className="text-muted mb-0">
							Choose what this user is allowed to do.
						</p>
					</Card.Header>
					<Card.Body>
						<div className="table-responsive-sm">
							<Table className="table-hover table-centered mb-0">
								<thead>
									<tr>
										<th>Page</th>
										<th>Create</th>
										<th>View</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(permissions).map((page) => (
										<tr key={page}>
											<td>{page}</td>
											<td>
												<Form.Check
													type="checkbox"
													style={{ cursor: 'pointer' }}
													checked={
														permissions[page as keyof Permissions].Create
													}
													onChange={() =>
														handlePermissionChange(
															page as keyof Permissions,
															'Create'
														)
													}
												/>
											</td>
											<td>
												<Form.Check
													type="checkbox"
													style={{ cursor: 'pointer' }}
													checked={permissions[page as keyof Permissions].View}
													onChange={() =>
														handlePermissionChange(
															page as keyof Permissions,
															'View'
														)
													}
												/>
											</td>
											<td>
												<Form.Check
													type="checkbox"
													style={{ cursor: 'pointer' }}
													checked={
														permissions[page as keyof Permissions].Update
													}
													onChange={() =>
														handlePermissionChange(
															page as keyof Permissions,
															'Update'
														)
													}
												/>
											</td>
											<td>
												<Form.Check
													type="checkbox"
													style={{ cursor: 'pointer' }}
													checked={
														permissions[page as keyof Permissions].Delete
													}
													onChange={() =>
														handlePermissionChange(
															page as keyof Permissions,
															'Delete'
														)
													}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Card.Body>
				</Card>

				<div className="d-flex justify-content-center mt-3">
					<Button type="submit" variant="success" disabled={loading}>
						Update User
					</Button>
				</div>
			</Form>
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				autohide
				delay={2000}
				className={`position-fixed top-0 start-50 translate-middle-x mt-5 toast ${toastVariant}`}
				style={{
					zIndex: 1050,
					width: 'auto',
					maxWidth: '90%',
					borderRadius: '8px',
				}}>
				<Toast.Body
					style={{
						textAlign: 'center',
						backgroundColor:
							toastVariant === 'success' ? '#18cc18f1' : '#cc2d18f1',
						color: 'white',
						padding: '15px 20px',
					}}>
					{toastMessage}
				</Toast.Body>
			</Toast>
		</>
	)
}

export default UserUpdate
