export type User = {
	is_superuser: boolean
	permissions: any
}

export type PermissionTypes = 'Create' | 'View' | 'Update' | 'Delete'

export type PagePermissions = {
	Create: boolean
	View: boolean
	Update: boolean
	Delete: boolean
}

export type Permissions = {
	Users: PagePermissions
	Category: PagePermissions
	Products: PagePermissions
	Inventory: PagePermissions
	WareHouse: PagePermissions
}

export interface UserData {
	email: string
	password: string
}
