import {
	HORIZONTAL_MENU_ITEMS,
	MENU_ITEMS,
	MenuItemTypes,
} from '@/constants/menu'
const getMenuItems = (permissions: any, isSuperUser?: boolean) => {
	// If permissions are not available or incomplete, return an empty array or the default menu items
	if (!permissions) {
		console.error('Permissions are missing')
		return MENU_ITEMS // You can also return an empty array [] if you want the menu hidden completely
	}

	if (isSuperUser) return MENU_ITEMS
	// Filter menu items based on user permissions
	return MENU_ITEMS.filter((item) => {
		// If the item is a title, always show it (like "User Management" title)
		if (item.isTitle) return true

		// Check if the user has permission to view this menu item (ensure permission key exists)
		if (
			item.key === 'products' &&
			(!permissions.Products || !permissions.Products.View)
		)
			return false
		if (
			item.key === 'category' &&
			(!permissions.Category || !permissions.Category.View)
		)
			return false
		if (
			item.key === 'shippings' &&
			(!permissions.Shipings || !permissions.Shippings.View)
		)
			return false
		if (
			item.key === 'orders' &&
			(!permissions.Orders || !permissions.Orders.View)
		)
			return false
		if (item.key === 'users' && (!permissions.Users || !permissions.Users.View))
			return false
		if (
			item.key === 'inventory' &&
			(!permissions.Inventory || !permissions.Inventory.View)
		)
			return false
		if (
			item.key === 'policies' &&
			(!permissions.Policies || !permissions.Policies.View)
		)
			return false
		if (
			item.key === 'settings' &&
			(!permissions.Settings || !permissions.Settings.View)
		)
			return false
		if (
			item.key === 'customers' &&
			(!permissions.Customers || !permissions.Customers.View)
		)
			return false

		// If the item has children, filter children based on user permissions
		if (item.children) {
			item.children = item.children.filter((child) => {
				console.log('checking child', child)

				const permissionKey =
					item.key.charAt(0).toUpperCase() + item.key.slice(1)
				console.log('checking ', permissionKey)

				return permissions[permissionKey]?.[child.key]
			})
		}

		// Return true if item is visible based on permissions
		return true
	})
}

const getHorizontalMenuItems = () => {
	// NOTE - You can fetch from server and return here as well
	return HORIZONTAL_MENU_ITEMS
}

const findAllParent = (
	menuItems: MenuItemTypes[],
	menuItem: MenuItemTypes
): string[] => {
	let parents: string[] = []
	const parent = findMenuItem(menuItems, menuItem.parentKey)

	if (parent) {
		parents.push(parent.key)
		if (parent.parentKey) {
			parents = [...parents, ...findAllParent(menuItems, parent)]
		}
	}
	return parents
}

const findMenuItem = (
	menuItems: MenuItemTypes[] | undefined,
	menuItemKey: MenuItemTypes['key'] | undefined
): MenuItemTypes | null => {
	if (menuItems && menuItemKey) {
		for (let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].key === menuItemKey) {
				return menuItems[i]
			}
			let found = findMenuItem(menuItems[i].children, menuItemKey)
			if (found) return found
		}
	}
	return null
}

export { findAllParent, findMenuItem, getMenuItems, getHorizontalMenuItems }
