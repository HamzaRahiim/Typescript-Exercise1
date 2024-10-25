import { FormInput, PageBreadcrumb } from '@/components'
import {
	Button,
	Card,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
	ListGroup,
	Nav,
	Row,
	Tab,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { ProductFormData, ProductVariant } from '@/types'
import { Link } from 'react-router-dom'
import { SingleFileUploader } from '@/components/FileUploader/SingleFileUploader'
import { FileUploader } from '@/components/FileUploader'
import { SimpleLoader } from '../other/SimpleLoader'
import { useAuthContext } from '@/common'
import { MdDelete } from 'react-icons/md'
import { TableRecord } from './Categories'

const modules = {
	toolbar: [
		[{ font: [] }, { size: [] }],
		['bold', 'italic', 'underline', 'strike'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
	],
}

const CreateProduct = () => {
	// *************************** states **************************************
	const [description, setDescription] = useState('')
	const [currency, setCurrency] = useState('PKR')
	const [isBestSeller, setIsBestSeller] = useState<boolean>(false)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [gallery, setGallery] = useState<File[]>([])
	const [loading, setLoading] = useState(false)
	const [variants, setVariants] = useState<ProductVariant[]>([])
	const [selectedVariantId, setSelectedVariantId] = useState('')
	const [variantValues, setVariantValues] = useState<string[]>([])
	const [addedVariants, setAddedVariants] = useState<any[]>([])
	const [categories, setCategories] = useState<any[]>([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [subCategories, setSubCategories] = useState<any[]>([])
	const [selectedSubCategory, setSelectedSubCategory] = useState('')
	// *************************** hooks & basics **************************************
	const BASE_API = import.meta.env.VITE_BASE_API
	const { user } = useAuthContext()
	const { token } = user

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<ProductFormData>({
		defaultValues: {
			name: '',
			description: '',
			sku: '',
		},
	})
	const handleToggle = () => {
		const newState = !isBestSeller
		setIsBestSeller(newState)
	}
	const handleVariantTypeChange = (e: any) => {
		const selectedId = e.target.value
		setSelectedVariantId(selectedId)

		// Extract values linked to the selected variant
		const values = variants
			.filter((variant) => variant.variantName._id === selectedId)
			.map((variant) => variant.value)
		setVariantValues(values)
	}
	const uniqueVariantTypes = variants
		.map((variant) => variant.variantName) // extract the variantName object
		.filter(
			(variant, index, self) =>
				index === self.findIndex((v) => v._id === variant._id) // keep only unique _id
		)

	const handleAddVariant = () => {
		if (selectedVariantId && variantValues.length > 0) {
			// Find the selected variant's name
			const selectedVariant = variants.find(
				(variant) => variant.variantName._id === selectedVariantId
			)

			// Add the variant to the addedVariants array
			setAddedVariants([
				...addedVariants,
				{
					type: selectedVariant?.variantName.name, // e.g., Color, Size
					value: variantValues[0], // Get the first value or adjust as needed
				},
			])
		}
	}

	const handleDeleteVariant = (indexToRemove: any) => {
		setAddedVariants(
			addedVariants.filter((_, index) => index !== indexToRemove)
		)
	}

	const handleCategoryChange = async (e: any) => {
		setSelectedCategory(e.target.value) // Save selected category ID in state
	}
	const handleSubCategoryChange = (e: any) => {
		setSelectedSubCategory(e.target.value) // Save selected category ID in state
	}
	// *************************** handle functions *****************************

	const AddNewProduct = (data: ProductFormData) => {
		data.description = description
		const price = {
			amount: data.price,
			currency: currency,
		}
		data.price = price
		data.isBestSeller = isBestSeller
		data.image = selectedImage
		data.gallery = gallery
		data.variants = addedVariants
		data.category = selectedCategory

		console.log('submitted data is ', data)
	}
	const handleDescriptionChange = (content: any) => {
		const sanitizedDescription = DOMPurify.sanitize(content)
		setDescription(sanitizedDescription)
	}

	// ****************************** getting data from api **********************
	const getVariants = async () => {
		try {
			setLoading(true)
			const response = await fetch(
				`${BASE_API}/api/variants/product-variants`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(
					errorMessage.message || 'Failed to get product variants'
				)
			}
			const data: ProductVariant[] = await response.json()
			if (data) {
				console.log(' I am variants api data  ', data)
				setVariants(data)
			}
		} catch (error: any) {
			console.error('Error getting product variants data:', error)
		} finally {
			setLoading(false)
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
				setCategories(data_res)
			}
			console.log(' I am categories api data  ', data_res)
		} catch (error: any) {
			console.error('Error getting categories api data : ', error)
		} finally {
			setLoading(false)
		}
	}
	const getSubCategories = async () => {
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
				setSubCategories(data)
			}
		} catch (error: any) {
			console.error('Error getting category data :', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getVariants()
		getCategories()
		getSubCategories()
	}, [])
	// **************************** render **************************************]
	if (loading) {
		return <SimpleLoader />
	}
	return (
		<>
			<PageBreadcrumb title="Add New Product" subName="Products" />
			<Form onSubmit={handleSubmit(AddNewProduct)}>
				<Row>
					<Col xs={12} md={8}>
						<Card>
							<Card.Header>
								<h4>Product Basic Information</h4>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col>
										<Form.Group className="mb-3">
											<FormInput
												label="Product Name"
												type="text"
												name="name"
												containerClass="mb-3"
												register={register}
												placeholder="Enter Product name here..."
												errors={errors}
												control={control}
												required
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Description</Form.Label>
											<ul
												className="list-group list-group-flush"
												style={{ padding: '0px', paddingBottom: '10px' }}>
												<li
													className="list-group-item"
													style={{ padding: '0px' }}>
													<div
														className="mb-2"
														style={{ padding: '0px', overflowX: 'auto' }}>
														{/* Ensure the description field is responsive */}
														<ReactQuill
															modules={modules}
															theme="snow"
															value={description}
															onChange={handleDescriptionChange}
															className="pb-4"
															style={{
																height: 340,
																maxWidth: '100%', // Prevent overflow
																boxSizing: 'border-box', // Ensure padding works within the container
															}}
														/>
													</div>
												</li>
											</ul>
										</Form.Group>
									</Col>
								</Row>
							</Card.Body>
						</Card>

						<Card>
							<Card.Header>
								<h4>Product Gallery</h4>
							</Card.Header>
							<Card.Body>
								{/* Single Image Uploader (Product Main Image) */}
								<div>
									<h5>Product Image</h5>
									<p>Add Product main Image</p>
								</div>
								<SingleFileUploader
									icon="ri-upload-cloud-2-line"
									text="Drop files here or click to upload."
									onFileUpload={(file: any) => setSelectedImage(file)} // You can handle file upload here
								/>
							</Card.Body>

							<Card.Body>
								{/* Multiple Image Uploader (Product Gallery) */}
								<div>
									<h5>Product Gallery</h5>
									<p>Add Product Gallery Images</p>
								</div>
								<FileUploader
									icon="ri-upload-cloud-2-line"
									text="Drop files here or click to upload."
									onFileUpload={(files: any) => setGallery(files)}
									// No maxFiles prop passed, allowing default multiple uploads
								/>
							</Card.Body>
						</Card>

						<Card>
							<Card.Header>
								<h4>Product Details</h4>
							</Card.Header>

							<Card.Body>
								<Tab.Container defaultActiveKey="general">
									{/* Tabs for Different Sections */}
									<Nav variant="tabs" role="tablist" className="mb-3">
										<Nav.Item as="li" role="presentation">
											<Nav.Link as={Link} to="#" eventKey="general">
												<span className="d-none d-md-block">General</span>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item as="li" role="presentation">
											<Nav.Link as={Link} to="#" eventKey="stock">
												<span className="d-none d-md-block">SKU</span>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item as="li" role="presentation">
											<Nav.Link as={Link} to="#" eventKey="variants">
												<span className="d-none d-md-block">Variants</span>
											</Nav.Link>
										</Nav.Item>
									</Nav>

									{/* Tab Content for Different Sections */}
									<Tab.Content>
										{/* General Tab Content */}
										<Tab.Pane eventKey="general">
											<Row>
												<Col>
													<Form.Group className="mb-3">
														<Form.Label htmlFor="price">Price</Form.Label>
														<InputGroup className="mb-3">
															<DropdownButton
																variant="success"
																title={currency}
																id="input-group-dropdown-1">
																<Dropdown.Item
																	onClick={() => setCurrency('PKR')}>
																	PKR
																</Dropdown.Item>
																<Dropdown.Item
																	onClick={() => setCurrency('USD')}>
																	USD
																</Dropdown.Item>
																<Dropdown.Item
																	onClick={() => setCurrency('EUD')}>
																	EUD
																</Dropdown.Item>
															</DropdownButton>
															<FormInput
																aria-label="Text input with dropdown button"
																type="number"
																name="price"
																register={register}
																placeholder="Enter Product Price"
															/>
														</InputGroup>
													</Form.Group>
												</Col>
												<Col>
													<div
														style={{ display: 'flex', alignItems: 'center' }}
														className="mt-3">
														<div
															className="toggle-container"
															style={{ marginRight: '10px' }}>
															<label className="toggle">
																<input
																	type="checkbox"
																	id="isBestSeller"
																	checked={isBestSeller}
																	onChange={handleToggle}
																/>
																<span className="slider"></span>
																<span className="text on">Yes</span>
																<span className="text off">No</span>
															</label>
														</div>
														<div className="info-text">
															<p style={{ margin: 0 }}>
																{'Keep In Best Seller Product.'}
															</p>
														</div>
													</div>
												</Col>
											</Row>
										</Tab.Pane>

										{/* Stock Tab Content */}
										<Tab.Pane eventKey="stock">
											<Form.Group className="mb-3 d-flex align-items-center">
												<h4
													style={{
														fontWeight: 'bold',
														fontSize: '1.1rem',
														color: '#333',
													}}
													className="me-3 fw-bold">
													SKU:
												</h4>
												<FormInput
													type="text"
													name="sku"
													placeholder="Enter Product SKU.."
													containerClass="mb-0"
													register={register}
													key="sku"
													errors={errors}
													control={control}
												/>
											</Form.Group>
										</Tab.Pane>

										{/* Variants Tab Content */}
										<Tab.Pane eventKey="variants">
											<h4>Select Variants Type</h4>
											<Row className="mb-3">
												<Col xs={6}>
													<Form.Select onChange={handleVariantTypeChange}>
														<option value="" disabled selected>
															Select Variant Type
														</option>
														{uniqueVariantTypes.map((variant, index) => (
															<option key={index} value={variant._id}>
																{variant.name} {/* e.g., Color or Size */}
															</option>
														))}
													</Form.Select>
												</Col>
												<Col xs={6}>
													<Form.Select>
														<option value="" disabled selected>
															{selectedVariantId
																? 'Select Value'
																: 'First Select Variant'}
														</option>
														{selectedVariantId &&
															variantValues.map((value, index) => (
																<option key={index} value={value}>
																	{value}
																</option>
															))}
													</Form.Select>
												</Col>
											</Row>
											<Button variant="success" onClick={handleAddVariant}>
												Add New Variants
											</Button>
											{addedVariants.length > 0 && (
												<ListGroup className="mt-3">
													{addedVariants.map((variant: any, index) => (
														<ListGroup.Item
															key={index}
															className="d-flex justify-content-between align-items-center mb-2">
															<div
																style={{
																	width: '48%', // Adjust as needed
																	display: 'flex',
																	justifyContent: 'center',
																	border: '1px solid #ced4da', // Bootstrap border color
																	borderRadius: '0.25rem', // Bootstrap border radius
																	padding: '0.375rem', // Padding for input-like appearance
																}}>
																{variant?.type}
															</div>

															<div
																style={{
																	width: '48%', // Adjust as needed
																	display: 'flex',
																	justifyContent: 'center',
																	alignItems: 'center',
																	border: '1px solid #ced4da', // Bootstrap border color
																	borderRadius: '0.25rem', // Bootstrap border radius
																	padding: '0.375rem', // Padding for input-like appearance
																}}>
																{variant?.value}
															</div>
															<MdDelete
																onClick={() => handleDeleteVariant(index)}
																style={{
																	color: 'red',
																	cursor: 'pointer',
																}} // Ensure the default color is inherited
															/>
														</ListGroup.Item>
													))}
												</ListGroup>
											)}
										</Tab.Pane>
									</Tab.Content>
								</Tab.Container>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} md={4}>
						<Card>
							<Card.Header>Product Categories</Card.Header>
							<Card.Body>
								<h5 className="mb-2">Category</h5>
								<Form.Select
									onChange={handleCategoryChange}
									value={selectedCategory}>
									<option defaultValue="">Select Category</option>
									{categories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.name} {/* Display category name */}
										</option>
									))}
								</Form.Select>
								<h5 className="mb-2 mt-3">Sub-Category</h5>
								<Form.Select
									onChange={handleSubCategoryChange}
									value={selectedSubCategory}>
									<option defaultValue="">Select Sub-Category</option>
									{subCategories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.name} {/* Display category name */}
										</option>
									))}
								</Form.Select>
								<h5 className="mb-2 mt-3">Brands</h5>
								<Form.Select>
									<option defaultValue="selected">Brands</option>
									<option value="Color">Chase Up</option>
									<option value="Material">Imtiaz</option>
								</Form.Select>
							</Card.Body>
						</Card>
						<Card className="mt-3">Card 5 data displayed below card 4</Card>
					</Col>
				</Row>
				<Button variant="soft-success" type="submit">
					Save Product
				</Button>
			</Form>
		</>
	)
}

export default CreateProduct
