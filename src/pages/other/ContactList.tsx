import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageBreadcrumb, PageSize, Table } from '@/components'
import { Column } from 'react-table'
import { employeeRecords } from '../ui/tables/data'
import { Card, Col, Row, Spinner, Button } from 'react-bootstrap'
import { Employee } from '../ui/tables/types'
import { useAuthContext } from '@/common'
import { MdEdit, MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

// Pagination options
const sizePerPageList: PageSize[] = [
	{ text: '15', value: 15 },
	{ text: '25', value: 25 },
	{ text: '30', value: 30 },
	{ text: 'All', value: employeeRecords.length },
]

const ContactList = () => {
	const { user, permissions } = useAuthContext()

	const canUpdate = permissions.Users?.Update
	const canDelete = permissions.Users?.Delete

	// State hooks
	const [data, setData] = useState<Employee[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	// Fetch user data from API
	const fetchUserData = async () => {
		setLoading(true)
		setError(null)

		const BASE_API = import.meta.env.VITE_BASE_API
		const yourAuthToken = user.token

		try {
			const response = await fetch(`${BASE_API}/api/users`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to fetch user data')
			}

			const fetchedData = await response.json()
			const mappedData = fetchedData.map((item: any, index: number) => ({
				id_ui: index + 1,
				name: item.username,
				phone: item.phone_number,
				role: item.role.role_name,
				email: item.email,
				action: null,
				id: item._id,
			}))

			setData(mappedData)
		} catch (error: any) {
			console.log('error in fetching user ', error.message)
		} finally {
			setLoading(false)
		}
	}

	// Delete user from API
	const deleteUser = async (userId: string) => {
		const BASE_API = import.meta.env.VITE_BASE_API
		const yourAuthToken = user.token

		try {
			const response = await fetch(`${BASE_API}/api/users/${userId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to delete user')
			}

			fetchUserData() // Refresh the data after deletion
			Swal.fire('Deleted!', 'User has been deleted successfully.', 'success')
		} catch (error: any) {
			setError(error.message)
			Swal.fire('Error!', 'User deletion failed.', 'error')
		}
	}

	// Handle delete confirmation modal
	const handleDeleteConfirmation = (userId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "This action can't be undone!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteUser(userId)
			}
		})
	}

	// Table columns definition
	const columns: ReadonlyArray<Column> = [
		{ Header: 'ID', accessor: 'id_ui', defaultCanSort: true },
		{ Header: 'Name', accessor: 'name', defaultCanSort: true },
		{ Header: 'Email', accessor: 'email', defaultCanSort: false },
		{ Header: 'Role', accessor: 'role', defaultCanSort: true },
		{ Header: 'Phone Number', accessor: 'phone', defaultCanSort: false },
		{
			Header: 'Action',
			accessor: 'action',
			Cell: ({ row }: { row: any }) => (
				<div className="d-flex">
					<Button variant="secondary" disabled={!canUpdate}>
						<Link to={`/user/update/${row.original.id}`}>
							<MdEdit />
						</Link>
					</Button>
					<Button
						variant="danger"
						className="ms-2"
						onClick={() => handleDeleteConfirmation(row.original.id)}
						disabled={!canDelete}>
						<MdDelete />
					</Button>
				</div>
			),
		},
	]

	useEffect(() => {
		fetchUserData()
	}, []) // Fetch data on component mount

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

	if (error) {
		return Swal.fire({
			title: 'Failed to retrieve user data',
			text: error,
			icon: 'error',
		})
	}

	return (
		<>
			<PageBreadcrumb title="Employee List" subName="User" />
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
								{/* Title and description */}
								<div>
									<h4 className="header-title">User List</h4>
									<p className="text-muted mb-0">
										A list of all registered users in the system
									</p>
								</div>
							</div>
						</Card.Header>

						<Card.Body>
							<Table<Employee>
								columns={columns}
								data={data}
								pageSize={15}
								sizePerPageList={sizePerPageList}
								isSortable
								pagination
								isSearchable
								isSelectable
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ContactList
