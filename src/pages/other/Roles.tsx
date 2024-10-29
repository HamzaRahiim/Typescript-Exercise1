import { Card, Col, Row, Button, Table, Form } from 'react-bootstrap'
import { Permission } from '@/types'
import { useState } from 'react'
import { FormInput, PageBreadcrumb } from '@/components'
import { useAuthContext } from '@/common'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { SmallLoader } from './SimpleLoader'

const Roles = () => {
	// Initial permission state
	const defaultpermission: Permission = {
		Products: { Create: false, View: false, Update: false, Delete: false },
		Orders: { Create: false, View: false, Update: false, Delete: false },
		Shippings: { Create: false, View: false, Update: false, Delete: false },
		Users: { Create: false, View: false, Update: false, Delete: false },
		Inventory: { Create: false, View: false, Update: false, Delete: false },
		Policies: { Create: false, View: false, Update: false, Delete: false },
		Settings: { Create: false, View: false, Update: false, Delete: false },
		Customers: { Create: false, View: false, Update: false, Delete: false },
	}

	const [permission, setpermission] = useState<Permission>(defaultpermission)

	const { user, isSuperUser, permissions } = useAuthContext()
	const [error, setError] = useState('') // Track validation error
	const [role, setRole] = useState('') // Track the role input
	// const [loading, setLoading] = useState(false)
	const [apiLoading, setApiLoading] = useState(false)
	// Function to reset form after successful submission
	const resetForm = () => {
		setpermission(defaultpermission) // Reset checkboxes to default
		setRole('') // Reset the role field
	}

	const canView = isSuperUser || permissions.Users?.View
	const canCreate = isSuperUser || permissions.Users?.Create
	const handlePermissionChange = (
		page: keyof Permission,
		permissionType: 'Create' | 'View' | 'Update' | 'Delete'
	) => {
		setpermission((prevpermission: any) => ({
			...prevpermission,
			[page]: {
				...prevpermission[page],
				[permissionType]: !prevpermission[page][permissionType],
			},
		}))
	}

	const handleSubmit = async () => {
		if (!role) {
			setError('Please Enter a Role Name.') // Set error if role is empty
			return
		}

		setError('') // Reset error if validation passes
		setApiLoading(true)
		const roleData = {
			role_name: role,
			permissions: permission,
		}
		console.log(roleData)

		try {
			const token = user.token
			const BASE_API = import.meta.env.VITE_BASE_API
			const response = await fetch(`${BASE_API}/api/users/role`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(roleData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Registration failed')
			}

			if (response.ok) {
				await response.json()
				Swal.fire({
					title: 'Role Created Successfully!',
					text: 'Role with permission has been created successfully!',
					icon: 'success',
					timer: 1500,
				})
				resetForm()
			}
		} catch (error: any) {
			Swal.fire({
				title: 'Error!',
				text: `This Role is already taken. Please choose another one.`,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}

		// if (loading) {
		// 	return (
		// 		<div
		// 			className="d-flex justify-content-center align-items-center"
		// 			style={{ height: '100vh' }}>
		// 			<Spinner animation="grow" style={{ margin: '0 5px' }} />
		// 			<Spinner animation="grow" style={{ margin: '0 5px' }} />
		// 			<Spinner animation="grow" style={{ margin: '0 5px' }} />
		// 		</div>
		// 	)
		// }
	}

	return (
		<div>
			<PageBreadcrumb title="Create New Role" subName="User" />
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<h4 className="header-title">{`Role & Permission`}</h4>
						</div>
						<div className="mt-3 mt-lg-0">
							{' '}
							{/* Responsive margin for small screens */}
							<Button
								style={{ border: 'none' }}
								variant="none"
								disabled={!canView}>
								<Link to="/user/role-all" className="btn btn-danger">
									See All Roles
								</Link>
							</Button>
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col lg={6} className="mb-3">
							{/* Input field for Role */}
							<FormInput
								label="Role"
								type="text"
								name="role_name"
								placeholder="Enter Role Name"
								containerClass=""
								value={role}
								onChange={(e) => setRole(e.target.value)} // Update role state
								key="role_name"
							/>
							{error && <small className="text-danger">{error}</small>}
						</Col>
					</Row>

					{/* Table for permission */}
					<div className="table-responsive-sm">
						<Table className="table-hover table-centered mb-0">
							<thead>
								<tr>
									<th>Page</th>
									<th>View</th>
									<th>Create</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{Object.keys(permission).map((page) => (
									<tr key={page}>
										<td>{page}</td>

										<td>
											<Form.Check
												type="checkbox"
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permission[page as keyof Permission].View}
												onChange={() =>
													handlePermissionChange(
														page as keyof Permission,
														'View'
													)
												}
											/>
										</td>
										<td>
											<Form.Check
												type="checkbox"
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permission[page as keyof Permission].Create}
												onChange={() =>
													handlePermissionChange(
														page as keyof Permission,
														'Create'
													)
												}
											/>
										</td>
										<td>
											<Form.Check
												type="checkbox"
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permission[page as keyof Permission].Update}
												onChange={() =>
													handlePermissionChange(
														page as keyof Permission,
														'Update'
													)
												}
											/>
										</td>
										<td>
											<Form.Check
												type="checkbox"
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permission[page as keyof Permission].Delete}
												onChange={() =>
													handlePermissionChange(
														page as keyof Permission,
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

					{/* Button to Submit Role & permission */}
					<Button
						className="mt-3"
						variant="success"
						onClick={handleSubmit}
						disabled={apiLoading || !canCreate}>
						{apiLoading ? <SmallLoader /> : `Save Role & Permission`}
					</Button>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Roles
