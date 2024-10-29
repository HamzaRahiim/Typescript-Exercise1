import { FormInput, PageBreadcrumb } from '@/components'
import {
	Button,
	Card,
	Form,
	Table,
	Pagination as BootstrapPagination,
	Modal,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useAuthContext } from '@/common'
import Swal from 'sweetalert2'
import { useToggle } from '@/hooks'
import { SingleFileUploader } from '@/components/FileUploader/SingleFileUploader'
import { useForm } from 'react-hook-form'
import { SimpleLoader } from '../other/SimpleLoader'
// basic tables
export interface TableRecord {
	_id: number
	name: string
	description?: string
	isNotShowed?: string
	productCount?: string
	image?: string
	cell?: string
	activeClass?: string
	parentCategory?: any
}

const Categories = () => {
	const { isSuperUser, permissions, user } = useAuthContext()
	const canUpdate = isSuperUser || permissions.Products?.Update
	const canDelete = isSuperUser || permissions.Products?.Delete
	const canCreate = isSuperUser || permissions.Products?.Create

	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(15)
	const [sortedAsc, setSortedAsc] = useState(true)
	const [showDeleteButton, setShowDeleteButton] = useState(false)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [apiLoading, setApiLoading] = useState(false)
	const [loading, setLoading] = useState(false)
	const [categoryData, setCategoryData] = useState<TableRecord[]>([])
	const [editingCategory, setEditingCategory] = useState<TableRecord | null>(
		null
	)

	const BASE_API = import.meta.env.VITE_BASE_API
	const { token } = user

	const {
		handleSubmit,
		register,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		setCurrentPage(1)
		setShowDeleteButton(selectedRows.length > 0)
	}, [itemsPerPage, selectedRows])

	useEffect(() => {
		getCategories()
	}, [])

	const deleteCategory = async (categoryId: string) => {
		try {
			const response = await fetch(
				`${BASE_API}/api/categories/category/${categoryId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete category')
			}

			getCategories() // Refresh the data after deletion
			Swal.fire({
				title: 'Deleted!',
				text: 'Category deleted successfully.',
				icon: 'success',
				timer: 1500,
			})
		} catch (error: any) {
			// setError(error.message)
			Swal.fire('Oops!', 'Category deletion failed.', 'error')
		}
	}
	const deleteSelectedCategory = async () => {
		try {
			console.log(' selected Rows ', selectedRows)

			const response = await fetch(
				`${BASE_API}/api/categories/categories`, // Correct endpoint
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ ids: selectedRows }), // Include the IDs in the body
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete category')
			}

			getCategories() // Refresh the data after deletion
			Swal.fire({
				title: 'Deleted!',
				text: `All the selected ${selectedRows.length} Category deleted successfully.`,
				icon: 'success',
				timer: 1500,
			})
		} catch (error: any) {
			// setError(error.message)
			Swal.fire('Oops!', 'Category deletion failed.', 'error')
		}
	}

	const handleDeleteSelected = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `All the ${selectedRows.length} selected items will be deleted!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Remove All!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteSelectedCategory()
				console.log('delete user success')
			}
		})
		console.log('Delete IDs:', selectedRows)
	}
	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelectedRows(categoryData.map((record) => record._id))
		} else {
			setSelectedRows([])
		}
	}

	const handleSelectRow = (id: number) => {
		setSelectedRows((prev) =>
			prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
		)
	}
	const handleDeleteConfirmation = (userId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This Items will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Remove!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteCategory(userId)
				console.log('delete user success')
			}
		})
	}
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const handleSort = () => {
		setSortedAsc(!sortedAsc)
	}

	const filteredRecords = categoryData
		.filter((record) =>
			record.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) =>
			sortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
		)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}
	const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
	const paginatedRecords = filteredRecords.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)
	const [isOpen, toggleModal] = useToggle() // Using toggle for modal state
	const handletoggleModal = () => {
		if (isOpen) {
			reset({ name: '', description: '' })
			setSelectedImage(null)
			setEditingCategory(null)
		}
		toggleModal()
	}
	const handleAddCategory = async (categoryData: any) => {
		// You can further handle this data and send it to an API endpoint here

		const formData = new FormData()
		formData.append('name', categoryData.name)
		formData.append('description', categoryData.description)
		if (selectedImage) {
			formData.append('image', selectedImage)
		}

		console.log('Category Data:', ...formData)

		setApiLoading(true)

		formData.forEach((value, key) => {
			console.log(key, value)
		})

		try {
			const response = await fetch(`${BASE_API}/api/categories/category`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to Add Category')
			}

			const data_res = await response.json()
			if (data_res) {
				Swal.fire({
					title: 'ADDED!',
					text: 'Category added successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				getCategories()
				reset()
			}
		} catch (error: any) {
			console.error('Error Adding Category', error)
			Swal.fire({
				title: 'Oops!',
				text: error.message,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}
	}

	const getCategories = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/categories/category`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to get categories')
			}

			const data_res: TableRecord[] = await response.json()
			if (data_res) {
				setCategoryData(data_res)
			}
			console.log(' date get from the api is ', data_res)
		} catch (error: any) {
			console.error('Error updating user Password:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleUpdateCategory = async (categoryData: any) => {
		console.log('Updating Category Data:', categoryData)

		const formData = new FormData()
		formData.append('name', categoryData.name)
		formData.append('description', categoryData.description)
		if (selectedImage) {
			formData.append('image', selectedImage)
		}

		setApiLoading(true)

		try {
			console.log(
				'before sending the request see my the id ',
				editingCategory?._id
			)

			const response = await fetch(
				`${BASE_API}/api/categories/category/${editingCategory?._id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `${token}`,
					},
					body: formData,
				}
			)

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to Update Category')
			}

			const data_res = await response.json()
			if (data_res) {
				getCategories()
				handletoggleModal()
				Swal.fire({
					title: 'Updated!',
					text: 'Category updated successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				reset()
				setEditingCategory(null)
			}
		} catch (error: any) {
			console.error('Error Updating Category', error)
			Swal.fire({
				title: 'Oops!',
				text: error.message,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}
	}

	const toggleEditModal = (category: TableRecord) => {
		setEditingCategory(category)
		setValue('name', category.name)
		setValue('description', category.description || '')
		toggleModal()
	}
	useEffect(() => {
		if (!isOpen) {
			reset()
			setSelectedImage(null)
			setEditingCategory(null)
		}
	}, [isOpen, reset])

	// Update form values when editing category changes
	useEffect(() => {
		if (editingCategory) {
			setValue('name', editingCategory.name)
			setValue('description', editingCategory.description || '')
		} else {
			reset({ name: '', description: '' })
		}
	}, [editingCategory, setValue, reset])

	if (loading) {
		return <SimpleLoader />
	}

	return (
		<>
			<PageBreadcrumb title="Categories" subName="Products" />
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<h4 className="header-title">Category Management</h4>
							<p className="text-muted mb-0">
								Add and Manage your all Product categories here.
							</p>
						</div>
						<div className="mt-3 mt-lg-0">
							{' '}
							{/* Responsive margin for small screens */}
							<Button
								style={{ border: 'none' }}
								disabled={!canCreate}
								variant="success"
								onClick={toggleModal}>
								<i className="bi bi-plus"></i> Add New Category
							</Button>
							{showDeleteButton && (
								<Button
									variant="danger"
									className="ms-2"
									onClick={handleDeleteSelected}>
									Delete All Selected
								</Button>
							)}
						</div>
					</div>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3">
						<div className="app-search d-none d-lg-block">
							<form>
								<div
									className="input-group"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										borderRadius: '10px',
										border: '1px solid rgba(0, 0, 0, 0.1)',
									}}>
									<input
										type="search"
										className="form-control"
										placeholder="Search Category here..."
										value={searchTerm}
										onChange={handleSearch}
										style={{
											backgroundColor: 'transparent',
											border: 'none',
											paddingLeft: '10px',
											color: '#333',
										}}
									/>
									<span
										className="ri-search-line search-icon text-muted"
										style={{ marginRight: '10px', color: '#666' }}
									/>
								</div>
							</form>
						</div>

						<Form.Select
							value={itemsPerPage}
							style={{ zIndex: 1 }}
							onChange={(e) => setItemsPerPage(Number(e.target.value))}
							className="w-auto mt-3 mt-lg-0">
							<option value={15}>15 items</option>
							<option value={30}>30 items</option>
							<option value={40}>40 items</option>
						</Form.Select>
					</div>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>
										<input
											type="checkbox"
											onChange={handleSelectAll}
											checked={selectedRows.length === categoryData.length}
										/>{' '}
									</th>

									<th>Image</th>
									<th>
										<span onClick={handleSort} style={{ cursor: 'pointer' }}>
											Name {sortedAsc ? '↑' : '↓'}
										</span>
									</th>
									<th>Description</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{paginatedRecords.length > 0 ? (
									(paginatedRecords || []).map((record, idx) => {
										const isSelected = selectedRows.includes(record._id)
										return (
											<tr key={idx}>
												<td>
													<input
														type="checkbox"
														checked={isSelected}
														onChange={() => handleSelectRow(record._id)}
													/>
												</td>

												<td className="table-user">
													{record?.image ? (
														<img
															src={`${BASE_API}/uploads/images/${record.image}`}
															alt="category"
															className="me-2 rounded-circle"
														/>
													) : (
														''
													)}
												</td>
												<td>{record.name}</td>
												<td>{record.description}</td>
												<td>
													<div className="d-flex">
														<Button
															variant="secondary"
															disabled={!canUpdate}
															onClick={() => toggleEditModal(record)}>
															<MdEdit />
														</Button>
														<Button
															variant="danger"
															className="ms-2"
															onClick={() =>
																handleDeleteConfirmation(record._id.toString())
															}
															disabled={!canDelete}>
															<MdDelete />
														</Button>
													</div>
												</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td colSpan={5} className="text-center">
											No records found
										</td>
									</tr>
								)}
							</tbody>
						</Table>
						<nav className="d-flex justify-content-end mt-3">
							<BootstrapPagination className="pagination-rounded mb-0">
								<BootstrapPagination.Prev
									onClick={() =>
										currentPage > 1 && handlePageChange(currentPage - 1)
									}
								/>
								{Array.from({ length: totalPages }, (_, index) => (
									<BootstrapPagination.Item
										key={index + 1}
										active={index + 1 === currentPage}
										onClick={() => handlePageChange(index + 1)}>
										{index + 1}
									</BootstrapPagination.Item>
								))}
								<BootstrapPagination.Next
									onClick={() =>
										currentPage < totalPages &&
										handlePageChange(currentPage + 1)
									}
								/>
							</BootstrapPagination>
						</nav>
					</div>
				</Card.Body>
				{/* Modal for adding a new category */}
				<Modal
					show={isOpen}
					onHide={handletoggleModal}
					dialogClassName="modal-dialog-centered">
					<Modal.Header closeButton>
						<h4 className="modal-title">
							{editingCategory ? 'Update Category' : 'Add New Category'}
						</h4>
					</Modal.Header>
					<Form
						onSubmit={handleSubmit(
							editingCategory ? handleUpdateCategory : handleAddCategory
						)}>
						<Modal.Body>
							<Form.Group className="mb-3">
								<FormInput
									label="Name"
									type="text"
									name="name"
									containerClass="mb-3"
									register={register}
									placeholder="Enter Category Name here.."
									errors={errors}
									control={control}
								/>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Label>Description</Form.Label>
								<p style={{ fontSize: '0.8rem' }} className="mb-2">
									You may write a description of up to 15 words.
								</p>
								<FormInput
									type="textarea"
									name="description"
									containerClass="mb-3"
									register={register}
									placeholder="Enter Description here.."
									errors={errors}
									control={control}
								/>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Label>
									{editingCategory ? 'Upload New Image' : 'Upload Image'}
								</Form.Label>
								<div className="mb-2">
									<p
										style={{ fontSize: '0.8rem' }}
										className="text-danger mb-0">
										{'File Size: Upload images up to 5 MB.'}
									</p>
									<p
										style={{ fontSize: '0.8rem' }}
										className="text-danger mb-0">
										{
											'Supported Formats: JPEG (.jpg, .jpeg), PNG (.png), GIF(.gif), WebP (.webp), and SVG (.svg).'
										}
									</p>
									<p
										style={{ fontSize: '0.8rem' }}
										className="text-danger mb-0">
										{'Upload Limit: Only 1 image can be uploaded.'}
									</p>
								</div>
								<SingleFileUploader
									icon="ri-upload-cloud-2-line"
									text="Drop file here or click to upload a product image."
									onFileUpload={(file: File) => setSelectedImage(file)}
								/>
								{editingCategory?.image && (
									<div className="mt-3 d-flex flex-column ">
										<Form.Label>Current Image</Form.Label>
										<img
											src={`${BASE_API}/uploads/images/${editingCategory.image}`}
											alt="Category"
											className="img-thumbnail mb-3"
											style={{ width: '100px', height: '100px' }}
										/>
									</div>
								)}
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="light" onClick={handletoggleModal}>
								Close
							</Button>
							<Button
								variant="soft-success"
								type="submit"
								disabled={editingCategory ? !canUpdate : !canCreate}>
								{apiLoading
									? editingCategory
										? 'Updating...'
										: 'Adding...'
									: editingCategory
									? 'Update Category'
									: 'Save Category'}
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</Card>
		</>
	)
}
export default Categories
