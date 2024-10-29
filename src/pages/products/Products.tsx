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
import { Link } from 'react-router-dom'
import { SimpleLoader } from '../other/SimpleLoader'

// basic tables
interface TableRecord {
	_id: string
	name: string
	brandId: string
	description: string
	isBestSeller: boolean
	price: {
		amount: number
		currency: string
	}
	category: string
	subcategory: string
	videoLink?: string // Optional if not always provided
	variants: Array<any> // Specify the type for the variants if known
	lifecycleStage: 'active' | 'discontinued' | 'upcoming' | 'archived'
	releaseDate: Date // Ensure the date is handled appropriately
	sku: string
	image: File // Ensure File type is correct based on how it's used
	gallery: File[] // Array of File objects
}

const Products = () => {
	const { isSuperUser, permissions } = useAuthContext()
	const canUpdate = isSuperUser || permissions.Users?.Update
	const canDelete = isSuperUser || permissions.Users?.Delete

	const [selectedRows, setSelectedRows] = useState<any[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(15)
	const [sortedAsc, setSortedAsc] = useState(true)
	const [showDeleteButton, setShowDeleteButton] = useState(false)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [productData, setProductData] = useState<TableRecord[]>([])
	const [loading, setLoading] = useState(false)

	const BASE_API = import.meta.env.VITE_BASE_API
	const { user } = useAuthContext()
	const { token } = user

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		setCurrentPage(1)
		setShowDeleteButton(selectedRows.length > 0)
	}, [itemsPerPage, selectedRows])

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
				// deleteUser(userId)
				console.log('delete user success')
			}
		})
		console.log('Delete IDs:', selectedRows)
	}
	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelectedRows(productData.map((product) => product._id))
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
				// deleteUser(userId)
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

	const filteredRecords = productData
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
	const handleUpdateProduct = (ProductData: any) => {
		// You can further handle this data and send it to an API endpoint here
		console.log('Product Data:', ProductData)

		const formData = new FormData()
		formData.append('name', ProductData.name)
		formData.append('description', ProductData.description)

		if (selectedImage) {
			formData.append('image', selectedImage)
		}
	}

	const getAllProducts = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/products`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to get products')
			}

			const data_res = await response.json()
			if (data_res) {
				setProductData(data_res)
			}
			console.log(' date get from the api is ', data_res)
		} catch (error: any) {
			console.error('Error get data of product:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getAllProducts()
	}, [])

	if (loading) {
		return <SimpleLoader />
	}
	return (
		<>
			<PageBreadcrumb title="Products Management" subName="Products" />
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<h4 className="header-title">Product Management</h4>
							<p className="text-muted mb-0">
								Add and Manage your all Product here.
							</p>
						</div>
						<div className="mt-3 mt-lg-0">
							{' '}
							{/* Responsive margin for small screens */}
							<Link to="/products/add-product" className="btn btn-success">
								<i className="bi bi-plus"></i> Add New Product
							</Link>
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
										placeholder="Search Product here..."
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
											checked={selectedRows.length === productData.length}
										/>
									</th>
									<th>Image</th>
									<th>
										<span onClick={handleSort} style={{ cursor: 'pointer' }}>
											Product Name {sortedAsc ? '↑' : '↓'}
										</span>
									</th>
									<th>Price</th>
									<th>SKU</th>
									<th>Status</th>
									<th>Best Seller</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{paginatedRecords.length > 0 ? (
									(productData || []).map((record: any, idx) => {
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
													{record.image ? (
														<img
															src={`${BASE_API}/uploads/images/${record.image}`}
															alt="product"
															className="me-2 rounded-circle"
														/>
													) : (
														''
													)}
												</td>
												<td>{record.name}</td>
												<td>{record.price?.amount}</td>
												<td>{record.sku}</td>
												<td>{record.lifecycleStage}</td>
												<td>{record.isBestSeller ? 'Yes' : 'No'}</td>
												<td>
													<div className="d-flex">
														<Button
															variant="secondary"
															disabled={!canUpdate}
															onClick={toggleModal}>
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
										<td colSpan={8} className="text-center">
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
				{/* Modal for adding a new Product */}
				<Modal
					show={isOpen}
					onHide={toggleModal}
					dialogClassName="modal-dialog-centered">
					<Modal.Header closeButton>
						<h4 className="modal-title">Add New Product</h4>
					</Modal.Header>
					<Form onSubmit={handleSubmit(handleUpdateProduct)}>
						<Modal.Body>
							<Form.Group className="mb-3">
								<FormInput
									label="Name"
									type="text"
									name="name"
									containerClass="mb-3"
									register={register}
									placeholder="Enter Product Name here.."
									errors={errors}
									control={control}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<FormInput
									label="Description"
									type="textarea"
									name="description"
									containerClass="mb-3"
									register={register}
									placeholder="Enter Description here.."
									errors={errors}
									control={control}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Image</Form.Label>
								<SingleFileUploader
									icon="ri-upload-cloud-2-line"
									text="Drop file here or click to upload a product image."
									onFileUpload={(file: File) => setSelectedImage(file)} // Handle image selection separately
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="light" onClick={toggleModal}>
								Close
							</Button>
							<Button variant="soft-success" type="submit">
								Save Product
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</Card>
		</>
	)
}
export default Products
