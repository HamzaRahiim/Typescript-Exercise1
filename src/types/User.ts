export type User = {
	is_superuser: boolean
	permissions: any
	role: string
}

export type PermissionTypes = 'Create' | 'View' | 'Update' | 'Delete'

export type PagePermissions = {
	Create: boolean
	View: boolean
	Update: boolean
	Delete: boolean
}

export type Permissions = {
	Products: PagePermissions
	Category: PagePermissions
	Shippings: PagePermissions
	Orders: PagePermissions
	Users: PagePermissions
	Inventory: PagePermissions
	Policies: PagePermissions
	Settings: PagePermissions
	Customers: PagePermissions
}

export interface UserData {
	email: string
	password: string
}
