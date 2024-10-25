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
import { useForm } from 'react-hook-form'
import { SimpleLoader } from '../other/SimpleLoader'

interface VariantRecord {
	_id: string
	name: string
}

interface ProductVariant {
	_id: string
	variantName: string
	value: string
}

const Variations = () => {
	const { isSuperUser, permissions, user } = useAuthContext()
	const canUpdate = isSuperUser || permissions.Products?.Update
	const canDelete = isSuperUser || permissions.Products?.Delete
	const canCreate = isSuperUser || permissions.Products?.Create

	// ************************** states **********************************
	const [selectedRows, setSelectedRows] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(15)
	const [sortedAsc, setSortedAsc] = useState(true)
	const [showDeleteButton, setShowDeleteButton] = useState(false)
	const [apiLoading, setApiLoading] = useState(false)
	const [selectAll, setSelectAll] = useState(false)
	const [loading, setLoading] = useState(false)
	const [variantsData, setVariantsData] = useState<VariantRecord[]>([])
	const [productVariantsData, setProductVariantsData] = useState<
		ProductVariant[]
	>([])
	const [editingVariant, setEditingVariant] = useState<VariantRecord | null>(
		null
	)

	// *************************** Basics & initiatlizations *****************************
	const BASE_API = import.meta.env.VITE_BASE_API
	const { token } = user
	const {
		handleSubmit,
		register,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm()
	const [isOpen, toggleModal] = useToggle()

	// ************************** helping functions **********************************
	useEffect(() => {
		setCurrentPage(1)
		setShowDeleteButton(selectedRows.length > 0)
	}, [itemsPerPage, selectedRows])

	useEffect(() => {
		getAllVariants()
	}, [])

	const filteredRecords = variantsData
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

	const handleToggleModal = () => {
		if (isOpen) {
			reset({ name: '' })
			setEditingVariant(null)
		}
		toggleModal()
	}

	const toggleEditModal = (variant: VariantRecord) => {
		setEditingVariant(variant)
		setValue('name', variant.name)
		toggleModal()
	}

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectAll(event.target.checked)
		if (event.target.checked) {
			setSelectedRows(variantsData.map((record) => record._id))
		} else {
			setSelectedRows([])
		}
	}

	const handleSelectRow = (id: string) => {
		setSelectedRows((prev) => {
			const newSelection = prev.includes(id)
				? prev.filter((rowId) => rowId !== id)
				: [...prev, id]

			// Update selectAll state based on whether all visible items are selected
			setSelectAll(newSelection.length === paginatedRecords.length)
			return newSelection
		})
	}

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const handleSort = () => {
		setSortedAsc(!sortedAsc)
	}

	const handleDeleteConfirmation = (variantId: string) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'This variant will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Remove!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteVariant(variantId)
			}
		})
	}

	const handleDeleteSelected = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `All the ${selectedRows.length} selected variants will be deleted!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete them!',
		}).then((result) => {
			if (result.isConfirmed) {
				// Implement bulk delete functionality
				deleteVariant(selectedRows)
				console.log('Delete variants:', selectedRows)
			}
		})
	}
	//  ***************************** api calling functions ***********************************

	const handleAddVariant = async (variantData: any) => {
		try {
			setApiLoading(true)
			const response = await fetch(`${BASE_API}/api/variants/variant-names`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: variantData.name }),
			})

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to add new variant')
			}

			const data_res = await response.json()
			if (data_res) {
				handleToggleModal()
				Swal.fire({
					title: 'Added!',
					text: 'Variant added successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				getAllVariants()
			}
		} catch (error: any) {
			console.error('Error adding variant:', error)
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

	const getAllVariants = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/variants/variant-names`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to get variants')
			}
			const data: VariantRecord[] = await response.json()
			setVariantsData(data)
		} catch (error: any) {
			console.error('Error getting variants data:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleUpdateVariant = async (variantData: any) => {
		try {
			setApiLoading(true)
			const response = await fetch(
				`${BASE_API}/api/variants/variant-names/${editingVariant?._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ name: variantData.name }),
				}
			)

			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message || 'Failed to update variant')
			}

			const data_res = await response.json()
			if (data_res) {
				handleToggleModal()
				await getAllVariants()
				Swal.fire({
					title: 'Updated!',
					text: 'Variant updated successfully!',
					icon: 'success',
					confirmButtonText: 'OK',
					timer: 1500,
				})
				reset()
				setEditingVariant(null)
			}
		} catch (error: any) {
			console.error('Error updating variant:', error)
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

	const deleteVariant = async (variantId: any) => {
		try {
			const id_select = typeof variantId === 'string' ? [variantId] : variantId
			const response = await fetch(
				`${BASE_API}/api/variants/variant-names/bulk-delete`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ ids: id_select }),
				}
			)
			if (!response.ok) {
				throw new Error('Failed to delete variant')
			}

			Swal.fire({
				title: 'Deleted!',
				text: 'Variant deleted successfully.',
				icon: 'success',
				timer: 1500,
			})
			getAllVariants()
		} catch (error: any) {
			console.error('Error deleting variant:', error)
			Swal.fire({
				title: 'Oops!',
				text: error.message,
				icon: 'error',
				timer: 1500,
			})
		} finally {
			setLoading(false)
		}
	}

	// ******************************* Rendering *******************************************
	if (loading) {
		return <SimpleLoader />
	}
	return (
		<>
			<Card>
				<Card.Header>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
						<div>
							<h4 className="header-title">Variant Management</h4>
							<p className="text-muted mb-0">
								Add and manage your variants name here.
							</p>
						</div>
						<div className="mt-3 mt-lg-0">
							<Button
								style={{ border: 'none' }}
								variant="success"
								disabled={!canCreate}
								onClick={toggleModal}>
								<i className="bi bi-plus"></i> Add New Variant
							</Button>
							{showDeleteButton && (
								<Button
									variant="danger"
									className="ms-2"
									onClick={handleDeleteSelected}>
									Delete Selected
								</Button>
							)}
						</div>
					</div>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mt-3">
						<Form.Control
							type="text"
							placeholder="Search variant by name"
							value={searchTerm}
							onChange={handleSearch}
							className="me-2"
						/>
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
											checked={selectAll}
										/>
									</th>
									<th>
										<span onClick={handleSort} style={{ cursor: 'pointer' }}>
											Variant Name {sortedAsc ? '↑' : '↓'}
										</span>
									</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{paginatedRecords.length > 0 ? (
									paginatedRecords.map((record, idx) => {
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
												<td>{record.name}</td>
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
										<td colSpan={3} className="text-center">
											No variants found
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
				<Modal
					show={isOpen}
					onHide={handleToggleModal}
					dialogClassName="modal-dialog-centered">
					<Modal.Header closeButton>
						<h4 className="modal-title">
							{editingVariant ? 'Update Variant' : 'Add New Variant'}
						</h4>
					</Modal.Header>
					<Form
						onSubmit={handleSubmit(
							editingVariant ? handleUpdateVariant : handleAddVariant
						)}>
						<Modal.Body>
							<Form.Group className="mb-3">
								<FormInput
									label="Variant Name"
									type="text"
									name="name"
									containerClass="mb-3"
									register={register}
									placeholder="Enter variant name here..."
									errors={errors}
									control={control}
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="light" onClick={handleToggleModal}>
								Close
							</Button>
							<Button
								variant="soft-success"
								type="submit"
								disabled={editingVariant ? !canUpdate : !canCreate}>
								{apiLoading
									? editingVariant
										? 'Updating...'
										: 'Adding...'
									: editingVariant
									? 'Update Variant'
									: 'Save Variant'}
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</Card>
		</>
	)
}

export default Variations
