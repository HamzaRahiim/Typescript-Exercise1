import { useAuthContext } from '@/common'
import { PageBreadcrumb, PageSize, Table } from '@/components'
import { useEffect, useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import Swal from 'sweetalert2'

const All_Roles = () => {
	const { user, permissions, isSuperUser } = useAuthContext()

	const canUpdate = isSuperUser || permissions.Users?.Update
	const canDelete = isSuperUser || permissions.Users?.Delete

	const [data, setData] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [employlist, setEmploylist] = useState<any>(null)

	const columns: ReadonlyArray<Column> = [
		{ Header: 'ID', accessor: 'id_ui', defaultCanSort: false },
		{ Header: 'Role Name', accessor: 'role', defaultCanSort: false },
		{
			Header: 'Action',
			accessor: 'action',
			Cell: ({ row }: { row: any }) => (
				<div className="d-flex">
					<Button variant="secondary" disabled={!canUpdate}>
						<Link to={`/user/update/role/${row.original.id}`}>
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

	const BASE_API = import.meta.env.VITE_BASE_API
	const yourAuthToken = user.token

	const fetchRolesData = async () => {
		setLoading(true)
		setError(null)

		try {
			const response = await fetch(`${BASE_API}/api/users/role`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to fetch user roles data.')
			}

			const fetchedData = await response.json()
			const mappedData = fetchedData.map((item: any, index: number) => ({
				id_ui: index + 1,
				role: item.role_name,
				action: null,
				id: item._id,
			}))

			setEmploylist(fetchedData.length)
			setData(mappedData)
		} catch (error: any) {
			console.log('error in fetching user ', error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteConfirmation = (userId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This Role Will Be Deleted!',
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
	// Delete user from API
	const deleteUser = async (userId: string) => {
		const BASE_API = import.meta.env.VITE_BASE_API
		const yourAuthToken = user.token
		console.log('role id ', userId)

		try {
			const response = await fetch(`${BASE_API}/api/users/role/${userId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${yourAuthToken}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to delete Role')
			}

			fetchRolesData() // Refresh the data after deletion
			Swal.fire('Deleted!', 'User has been deleted successfully.', 'success')
		} catch (error: any) {
			// setError(error.message)
			Swal.fire('Error!', 'User deletion failed.', 'error')
		}
	}

	useEffect(() => {
		fetchRolesData()
	}, []) // Fetch data on component mount

	const sizePerPageList: PageSize[] = [
		{ text: '15', value: 15 },
		{ text: '25', value: 25 },
		{ text: '30', value: 30 },
		{ text: 'All', value: employlist },
	]

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

	// if (error) {
	// 	return Swal.fire({
	// 		title: 'Failed to retrieve user data',
	// 		text: error,
	// 		icon: 'error',
	// 	})
	// }

	return (
		<>
			<PageBreadcrumb title="Roles List" subName="User" />
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						{/* Title and description */}
						<div>
							<h4 className="header-title">Roles List</h4>
							<p className="text-muted mb-0">
								A list of all Roles in the system
							</p>
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Card.Body>
						<Table
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
				</Card.Body>
			</Card>
		</>
	)
}
export default All_Roles
