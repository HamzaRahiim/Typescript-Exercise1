export * from './User'

export interface ProductFormData {
	name: string
	description?: string
	sku?: string
	price?: any
	isBestSeller?: boolean
	image?: File | null
	gallery?: File[] | null
	variants: any[]
	category?: string | null
}

export interface ProductVariant {
	_id: string
	variantName: {
		_id: string
		name: string // for display in dropdown
	}
	value: string
}
