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
import Swal from 'sweetalert2'

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
	const [apiLoading, setApiLoading] = useState(false)
	const [variants, setVariants] = useState<ProductVariant[]>([])
	const [selectedVariantId, setSelectedVariantId] = useState('')
	const [variantValues, setVariantValues] = useState<string[]>([])
	const [addedVariants, setAddedVariants] = useState<any[]>([])
	const [categories, setCategories] = useState<any[]>([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [subCategories, setSubCategories] = useState<any[]>([])
	const [selectedSubCategory, setSelectedSubCategory] = useState('')
	const [filterSubCategory, setFilterSubCategory] = useState<any[]>([])
	const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState('')
	const [brands, setBrands] = useState<any[]>([])
	const [selectedBrand, setSelectedBrand] = useState('')
	const [productStatus, setProductStatus] = useState('active')

	const [selectedVariantValue, setSelectedVariantValue] = useState('')
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
	// When user selects a variant type, it filters corresponding values
	const handleVariantTypeChange = (e: any) => {
		const selectedId = e.target.value
		setSelectedVariantId(selectedId)
		setSelectedVariantValue('')

		const values = variants
			.filter((variant) => variant.variantName._id === selectedId)
			.map((variant) => variant.value)
		setVariantValues(values)
	}
	// Creates unique list of variant types for first dropdown
	const uniqueVariantTypes = variants
		.map((variant) => variant.variantName)
		.filter(
			(variant, index, self) =>
				index === self.findIndex((v) => v._id === variant._id) // keep only unique _id
		)

	const handleVariantValueChange = (e: any) => {
		setSelectedVariantValue(e.target.value)
	}

	const handleAddVariant = () => {
		if (selectedVariantId && selectedVariantValue) {
			const selectedVariant = variants.find(
				(variant) => variant.variantName._id === selectedVariantId
			)

			const selectedValueObject = variants.find(
				(variant) => variant.value === selectedVariantValue
			)

			setAddedVariants([
				...addedVariants,
				{
					type: selectedVariant?.variantName.name,
					value: selectedVariantValue, // Use selected value instead of first one
					variantId: selectedValueObject?._id,
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
		const categoryId = e.target.value
		setSelectedCategory(categoryId)
		setSelectedSubCategoryValue('') // Reset subcategory when category changes

		// Filter subcategories that match the selected category
		const filteredSubCategories = subCategories.filter(
			(subCategory: any) => subCategory.parentCategory._id === categoryId
		)
		setFilterSubCategory(filteredSubCategories)
	}
	const handleSubCategoryChange = (e: any) => {
		setSelectedSubCategoryValue(e.target.value)
		setSelectedSubCategory(e.target.value)
	}
	const handleBrandChange = (e: any) => {
		setSelectedBrand(e.target.value)
	}

	// *************************** handle functions *****************************

	const AddNewProduct = async (data: ProductFormData) => {
		const formData = new FormData()

		// Required fields
		formData.append('name', data.name)
		formData.append('brandId', selectedBrand)
		formData.append('category', selectedCategory)
		formData.append('description', description)

		// Price object needs to be stringified
		const priceObject = {
			amount: Number(data.price),
			currency: currency,
		}
		formData.append('price', JSON.stringify(priceObject))

		// Boolean needs to be explicitly converted to string
		formData.append('IsBestSeller', String(isBestSeller))

		// Optional fields
		if (selectedSubCategory) formData.append('subcategory', selectedSubCategory)
		if (data.videoLink) formData.append('videoLink', data.videoLink)
		if (data.sku) formData.append('sku', data.sku)
		if (productStatus) formData.append('lifecycleStage', productStatus)
		if (data.releaseDate) formData.append('releaseDate', data.releaseDate)

		// Files
		if (selectedImage) formData.append('image', selectedImage)
		if (gallery.length > 0) {
			gallery.forEach((file, index) => {
				formData.append(`gallery`, file)
			})
		}

		if (addedVariants.length > 0) {
			addedVariants.forEach((variant) => {
				formData.append('variants[]', variant.variantId)
			})
		}

		console.log('Form data prepared:', formData)
		try {
			setApiLoading(true)
			const response = await fetch(`${BASE_API}/api/products`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			})
			if (!response.ok) {
				const errorMessage = await response.json()
				throw new Error(errorMessage.message)
			}
			const responseData = await response.json()
			console.log('Product added successfully:', responseData)
			if (responseData) {
				Swal.fire({
					title: 'Added!',
					text: 'Product is Added Successfully.',
					icon: 'success',
					timer: 1500,
				})
				reset() // Reset react-hook-form fields
				setDescription('') // Reset description
				setIsBestSeller(false) // Reset bestseller
				setSelectedImage(null) // Reset main image
				setGallery([]) // Reset gallery
				setAddedVariants([]) // Reset variants
				setSelectedCategory('') // Reset category
				setSelectedSubCategory('') // Reset subcategory
				setSelectedBrand('') // Reset brand
				setProductStatus('active') // Reset product status
			}
		} catch (error: any) {
			console.error('Error adding product:')
			Swal.fire({
				title: 'Oops!',
				text: error.message,
				icon: 'error',
				// timer: 1500,
			})
		} finally {
			setApiLoading(false)
		}
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
			// console.log(' I am categories api data  ', data_res)
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

			// console.log('data from sub-category ', data)

			if (data) {
				setSubCategories(data)
			}
		} catch (error: any) {
			console.error('Error getting category data :', error)
		} finally {
			setLoading(false)
		}
	}
	const getBrands = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${BASE_API}/api/brands`, {
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

			// console.log('data from brands ', data)

			if (data) {
				setBrands(data)
			}
		} catch (error: any) {
			console.error('Error getting brands data :', error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getVariants()
		getCategories()
		getSubCategories()
		getBrands()
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
								<div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
									<div>
										<h4 className="header-title">Product Basic Information</h4>
									</div>
									<div className="mt-3 mt-lg-0">
										<Link to="/products/all-product" className="btn btn-danger">
											See All Products
										</Link>
									</div>
								</div>
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
								<div className="mb-2">
									<h5>Feature Product</h5>
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
									text="Drop files here or click to upload."
									onFileUpload={(file: any) => setSelectedImage(file)} // You can handle file upload here
								/>
							</Card.Body>

							<Card.Body>
								{/* Multiple Image Uploader (Product Gallery) */}
								<div className="mb-2">
									<h5>Product Gallery</h5>
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
										{'Upload Limit: Upto 5 images can be uploaded.'}
									</p>
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
												<span className="d-block">General</span>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item as="li" role="presentation">
											<Nav.Link as={Link} to="#" eventKey="stock">
												<span className="d-block">SKU</span>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item as="li" role="presentation">
											<Nav.Link as={Link} to="#" eventKey="variants">
												<span className="d-block">Variants</span>
											</Nav.Link>
										</Nav.Item>
									</Nav>

									{/* Tab Content for Different Sections */}
									<Tab.Content>
										{/* General Tab Content */}
										<Tab.Pane eventKey="general">
											<Row>
												<Col xs={12} lg={6} className="mb-3">
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
												<Col xs={12} lg={6}>
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
												<Col xs={12} md={6} className="mb-3 mb-md-0">
													<Form.Select onChange={handleVariantTypeChange}>
														<option value="" disabled selected>
															Select Variant Type
														</option>
														{uniqueVariantTypes.map((variant, index) => (
															<option key={index} value={variant._id}>
																{variant.name}
															</option>
														))}
													</Form.Select>
												</Col>
												<Col xs={12} md={6}>
													<Form.Select
														value={selectedVariantValue}
														onChange={handleVariantValueChange}>
														<option value="" disabled>
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
												Save & Add New Variants
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
											{category.name}
										</option>
									))}
								</Form.Select>
								<h5 className="mb-2 mt-3">Sub-Category</h5>
								<Form.Select
									onChange={handleSubCategoryChange}
									value={selectedSubCategoryValue}>
									<option value="" disabled>
										{selectedCategory
											? 'Select SubCategory'
											: 'First Select Category'}
									</option>
									{filterSubCategory.map((subCategory) => (
										<option key={subCategory._id} value={subCategory._id}>
											{subCategory.name}
										</option>
									))}
								</Form.Select>
								<h5 className="mb-2 mt-3">Brands</h5>
								<Form.Select onChange={handleBrandChange} value={selectedBrand}>
									<option defaultValue="">Select Category</option>
									{brands.map((brand) => (
										<option key={brand._id} value={brand._id}>
											{brand.name}
										</option>
									))}
								</Form.Select>
							</Card.Body>
						</Card>
						<Card>
							<Card.Header>Publish</Card.Header>
							<Card.Body>
								<h5 className="mb-2">Product Status</h5>
								<Form.Select
									value={productStatus} // Bind the selected value to state
									onChange={(e) => setProductStatus(e.target.value)}>
									<option value="active">Active</option>
									<option value="upcoming">UpComing</option>
									<option value="archived">Archived</option>
									<option value="discontinued">Discontinued</option>
								</Form.Select>
								{/* Conditionally show this text if 'upcoming' is selected */}
								{productStatus === 'upcoming' && (
									<FormInput
										label="Release Date"
										type="date"
										name="releaseDate"
										containerClass="mb-3 mt-3"
										register={register}
										key="date"
										errors={errors}
										control={control}
									/>
								)}
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Button variant="success" type="submit" disabled={apiLoading}>
					{apiLoading ? 'Adding..' : 'Save Product'}
				</Button>
			</Form>
		</>
	)
}

export default CreateProduct
