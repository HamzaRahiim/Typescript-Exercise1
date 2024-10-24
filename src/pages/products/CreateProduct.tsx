import { FormInput, PageBreadcrumb } from '@/components'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { useState } from 'react'
import DOMPurify from 'dompurify'
import { ProductFormData } from '@/types'

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
	// *************************** hooks & basics **************************************

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
		},
	})

	// *************************** states **************************************
	const [description, setDescription] = useState('')

	// *************************** handle functions *****************************

	const AddNewProduct = (data: ProductFormData) => {
		data.description = description

		console.log('submitted data is ', data)
	}
	const handleDescriptionChange = (content: any) => {
		const sanitizedDescription = DOMPurify.sanitize(content)
		setDescription(sanitizedDescription)
	}

	// **************************** render **************************************
	return (
		<>
			<PageBreadcrumb title="Add New Product" subName="Products" />
			<Form onSubmit={handleSubmit(AddNewProduct)}>
				<Card>
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
										<li className="list-group-item" style={{ padding: '0px' }}>
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
					<Card.Footer>
						<Button variant="soft-success" type="submit">
							Save Product
						</Button>
					</Card.Footer>
				</Card>
			</Form>
		</>
	)
}

export default CreateProduct
