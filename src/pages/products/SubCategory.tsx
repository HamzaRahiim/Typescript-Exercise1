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
import { TableRecord } from './Categories'

const SubCategory = () => {
	const { isSuperUser, permissions, user } = useAuthContext()
	const canUpdate = isSuperUser || permissions.Products?.Update
	const canDelete = isSuperUser || permissions.Products?.Delete
	const canCreate = isSuperUser || permissions.Products?.Create
	// const canView = isSuperUser || permissions.Products?.View

	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(15)
	const [sortedAsc, setSortedAsc] = useState(true)
	const [showDeleteButton, setShowDeleteButton] = useState(false)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)
	const [parentCategories, setParentCategories] = useState<TableRecord[]>([])
	const [apiLoading, setApiLoading] = useState(false)
	const [subCategoryData, setSubCategoryData] = useState<TableRecord[]>([])
	const [editingSubCategory, setEditingSubCategory] =
		useState<TableRecord | null>(null)

	const BASE_API = import.meta.env.VITE_BASE_API
	const token = user.token
	const {
		handleSubmit,
		register,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		setCurrentPage(1)
		setShowDeleteButton(selectedRows.length > 0)
	}, [itemsPerPage, selectedRows])

	const deleteSelectedSubCategory = async () => {
		try {
			console.log(' selected Rows ', selectedRows)

			const response = await fetch(
				`${BASE_API}/api/categories/subcategories`, // Correct endpoint
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

			getAllSubCategories() // Refresh the data after deletion
			Swal.fire({
				title: 'Deleted!',
				text: `All the selected ${selectedRows.length} SubCategory deleted successfully.`,
				icon: 'success',
				timer: 1500,
			})
		} catch (error: any) {
			// setError(error.message)
			Swal.fire('Oops!', 'SubCategory deletion failed.', 'error')
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
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteSelectedSubCategory()
			}
		})
	}
	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelectedRows(subCategoryData.map((record) => record._id))
		} else {
			setSelectedRows([])
		}
	}

	const handleSelectRow = (_id: number) => {
		setSelectedRows((prev) =>
			prev.includes(_id)
				? prev.filter((row_id) => row_id !== _id)
				: [...prev, _id]
		)
	}

	const deleteItem = async (user_id: string) => {
		try {
			setApiLoading(true)
			const response = await fetch(
				`${BASE_API}/api/categories/subcategory/${user_id}`,
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

			Swal.fire({
				title: 'Deleted!',
				text: 'Sub-Category deleted successfully.',
				icon: 'success',
				timer: 1500,
			})
			getAllSubCategories() // Refresh the data after deletion
		} catch (error: any) {
			console.error('Error deleting user:', error)
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
	const handleDeleteConfirmation = (user_id: string) => {
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
				deleteItem(user_id)
			}
		})
	}
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const handleSort = () => {
		setSortedAsc(!sortedAsc)
	}

	const filteredRecords = subCategoryData
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

	// const handletoggleModal = () => {
	// 	if (isOpen) {
	// 		reset({ name: '', description: '', parentCategory: '' })
	// 		setSelectedImage(null)
	// 		setEditingSubCategory(null)
	// 	}
	// 	toggleModal()
	// }
	const toggleEditModal = (subCategory: TableRecord) => {
		setEditingSubCategory(subCategory)
		setValue('name', subCategory.name)
		setValue('description', subCategory.description || '')
		setValue('parentCategory', subCategory.parentCategory._id)
		toggleModal()
	}
	const handleAddSubCategory = async (categoryData: any) => {
		// You can further handle this data and send it to an API endpoint here
		console.log('Sub Category Data:', categoryData)

		const formData = new FormData()
		formData.append('name', categoryData.name)
		formData.append('description', categoryData.description)
		formData.append('parentCategory', categoryData.parentCategory)
		if (selectedImage) {
			formData.append('image', selectedImage)
		}

		try {
			setApiLoading(true)
			const response = await fetch(`${BASE_API}/api/categories/subcategory`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(
					errorMessage.message || 'Failed to add new Sub-category'
				)
			}

			const data_res = await response.json()
			if (data_res) {
				Swal.fire({
					title: 'ADDED!',
					text: 'Sub-Category added successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				getAllSubCategories()
			}
		} catch (error: any) {
			console.error('Error adding sub-category:', error)
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
	const getAllSubCategories = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/categories/subcategory`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to get subcategories')
			}
			const data: TableRecord[] = await response.json()

			console.log('data from sub-category ', data)

			if (data) {
				setSubCategoryData(data)
			}
		} catch (error: any) {
			console.error('Error getting category data :', error)
		} finally {
			setLoading(false)
		}
	}

	const getParentCategory = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/categories/category`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to get Category')
			}

			const data_res = await response.json()
			if (data_res.length > 0) {
				setParentCategories(data_res)
			}
			console.log(' data from api of categories get ', data_res)
		} catch (error: any) {
			console.error('Error getting category data :', error)
		} finally {
			setLoading(false)
		}
	}
	// Add handleUpdateSubCategory function
	const handleUpdateSubCategory = async (subCategoryData: any) => {
		const formData = new FormData()
		formData.append('name', subCategoryData.name)
		formData.append('description', subCategoryData.description)
		formData.append('parentCategory', subCategoryData.parentCategory)
		if (selectedImage) {
			formData.append('image', selectedImage)
		}

		try {
			setApiLoading(true)
			const response = await fetch(
				`${BASE_API}/api/categories/subcategory/${editingSubCategory?._id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				}
			)

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to Update Sub-Category')
			}

			const data_res = await response.json()
			if (data_res) {
				Swal.fire({
					title: 'Updated!',
					text: 'Sub-Category updated successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				getAllSubCategories()
				reset()
				setEditingSubCategory(null)
				toggleModal()
			}
		} catch (error: any) {
			console.error('Error Updating Sub-Category:', error)
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

	// Add useEffect for form reset on modal close
	useEffect(() => {
		if (!isOpen) {
			reset()
			setSelectedImage(null)
			setEditingSubCategory(null)
		}
	}, [isOpen, reset])

	useEffect(() => {
		getAllSubCategories()
		getParentCategory()
	}, [])
	if (loading) {
		return <SimpleLoader />
	}
	return (
		<>
			<PageBreadcrumb title="Sub-Category" subName="Products" />
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<h4 className="header-title">Sub-Category Management</h4>
							<p className="text-muted mb-0">
								Add and Manage your all Product sub-categories here.
							</p>
						</div>
						<div className="mt-3 mt-lg-0">
							{' '}
							{/* Responsive margin for small screens */}
							<Button
								disabled={!canCreate}
								style={{ border: 'none' }}
								variant="success"
								onClick={() => toggleModal()}>
								<i className="bi bi-plus"></i> Add New Sub-Category
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
										placeholder="Search SubCategory..."
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
											checked={selectedRows.length === subCategoryData.length}
										/>{' '}
									</th>

									<th>Image</th>
									<th>Parent Category</th>
									<th>
										<span onClick={handleSort} style={{ cursor: 'pointer' }}>
											SubCategory {sortedAsc ? '↑' : '↓'}
										</span>
									</th>
									<th>Description</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{paginatedRecords.length > 0 ? (
									(paginatedRecords || []).map((record, _idx) => {
										const isSelected = selectedRows.includes(record._id)
										return (
											<tr key={_idx}>
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
												<td>{record.parentCategory.name}</td>
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
					onHide={toggleModal}
					dialogClassName="modal-dialog-centered">
					<Modal.Header closeButton>
						<h4 className="modal-title">
							{editingSubCategory
								? 'Update Sub-Category'
								: 'Add New Sub-Category'}
						</h4>
					</Modal.Header>
					<Form
						onSubmit={handleSubmit(
							editingSubCategory
								? handleUpdateSubCategory
								: handleAddSubCategory
						)}>
						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Label>Parent Category</Form.Label>
								<Form.Select {...register('parentCategory')} defaultValue="">
									<option value="" disabled>
										Select Parent Category
									</option>
									{parentCategories ? (
										parentCategories.map((category) => (
											<option key={category._id} value={category._id}>
												{category.name}
											</option>
										))
									) : (
										<option>No Parent Categories Available</option>
									)}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3">
								<FormInput
									label="SubCategory Name"
									type="text"
									name="name"
									containerClass="mb-3"
									register={register}
									placeholder="Enter Sub-Category Name here.."
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
								<Form.Label>Image</Form.Label>
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
									onFileUpload={(file: File) => setSelectedImage(file)} // Handle image selection separately
								/>
								{editingSubCategory?.image && (
									<div className="mt-3 d-flex flex-column">
										<Form.Label>Current Image</Form.Label>
										<img
											src={`${BASE_API}/uploads/images/${editingSubCategory.image}`}
											alt="Sub-Category"
											className="img-thumbnail mb-3"
											style={{ width: '100px', height: '100px' }}
										/>
									</div>
								)}
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="light" onClick={toggleModal}>
								Close
							</Button>
							<Button
								variant="soft-success"
								type="submit"
								disabled={editingSubCategory ? !canUpdate : !canCreate}>
								{apiLoading
									? editingSubCategory
										? 'Updating...'
										: 'Adding...'
									: editingSubCategory
									? 'Update Sub-Category'
									: 'Save Sub-Category'}
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</Card>
		</>
	)
}
export default SubCategory
