import { Card, Col, Row, Button, Table, Form, Spinner } from 'react-bootstrap'
import { Permissions } from '@/types'
import { useState } from 'react'
import { FormInput, PageBreadcrumb } from '@/components'
import { useAuthContext } from '@/common'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Roles = () => {
	// Initial permissions state
	const defaultPermissions: Permissions = {
		Products: { Create: false, View: false, Update: false, Delete: false },
		Category: { Create: false, View: false, Update: false, Delete: false },
		Orders: { Create: false, View: false, Update: false, Delete: false },
		Shippings: { Create: false, View: false, Update: false, Delete: false },
		Users: { Create: false, View: false, Update: false, Delete: false },
		Inventory: { Create: false, View: false, Update: false, Delete: false },
		Policies: { Create: false, View: false, Update: false, Delete: false },
		Settings: { Create: false, View: false, Update: false, Delete: false },
		Customers: { Create: false, View: false, Update: false, Delete: false },
	}

	const [permissions, setPermissions] =
		useState<Permissions>(defaultPermissions)

	const { user } = useAuthContext()

	const [role, setRole] = useState('') // Track the role input
	const [loading, setLoading] = useState(false)
	// Function to reset form after successful submission
	const resetForm = () => {
		setPermissions(defaultPermissions) // Reset checkboxes to default
		setRole('') // Reset the role field
	}

	const handlePermissionChange = (
		page: keyof Permissions,
		permissionType: 'Create' | 'View' | 'Update' | 'Delete'
	) => {
		setPermissions((prevPermissions) => ({
			...prevPermissions,
			[page]: {
				...prevPermissions[page],
				[permissionType]: !prevPermissions[page][permissionType],
			},
		}))
	}

	const handleSubmit = async () => {
		setLoading(true)
		const roleData = {
			role_name: role,
			permissions,
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
					text: 'Role with permissions has been created successfully!',
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
			setLoading(false)
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
							<Button style={{ border: 'none' }} variant="none">
								<Link to="/user/role-all" className="btn btn-danger">
									See All Roles
								</Link>
							</Button>
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col lg={6}>
							{/* Input field for Role */}
							<FormInput
								label="Role"
								type="text"
								name="role_name"
								placeholder="Enter Role Name"
								containerClass="mb-3"
								value={role}
								onChange={(e) => setRole(e.target.value)} // Update role state
								key="role_name"
							/>
						</Col>
					</Row>

					{/* Table for Permissions */}
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
								{Object.keys(permissions).map((page) => (
									<tr key={page}>
										<td>{page}</td>

										<td>
											<Form.Check
												type="checkbox"
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
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
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permissions[page as keyof Permissions].Create}
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
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permissions[page as keyof Permissions].Update}
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
												style={{ margin: '0 auto', display: 'block' }} // Center checkbox
												checked={permissions[page as keyof Permissions].Delete}
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

					{/* Button to Submit Role & Permissions */}
					<Button
						className="mt-3"
						variant="success"
						onClick={handleSubmit}
						disabled={loading}>
						{`Save Role & Permission`}
					</Button>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Roles
