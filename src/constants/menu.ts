export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: React.ComponentType | any
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
}
import { MdProductionQuantityLimits } from 'react-icons/md'
import { MdLocalShipping } from 'react-icons/md'
import { MdOutlineRequestQuote } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa6'
import { FaWarehouse } from 'react-icons/fa6'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { IoSettingsSharp } from 'react-icons/io5'
import { VscOrganization } from 'react-icons/vsc'

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'dashboard',
		label: 'Dashboards',
		isTitle: false,
		url: '/',
		icon: 'ri-dashboard-3-line',
		badge: {
			variant: 'success',
			text: '9+',
		},
	},
	{
		key: 'products',
		label: 'Products',
		isTitle: false,
		icon: MdProductionQuantityLimits,
		children: [
			{
				key: 'View',
				label: 'Items Management',
				url: '/products/all-product',
				parentKey: 'products',
			},
			{
				key: 'View',
				label: 'Categories',
				url: '/products/categories',
				parentKey: 'products',
			},
			{
				key: 'View',
				label: 'Sub-Categories',
				url: '/products/sub-category',
				parentKey: 'products',
			},
			{
				key: 'View',
				label: 'Brands',
				url: '/products/brand',
				parentKey: 'products',
			},
			{
				key: 'View',
				label: 'Product Variants',
				url: '/products/variation',
				parentKey: 'products',
			},
			// {
			// 	key: 'View',
			// 	label: 'Home Features',
			// 	url: '/products/home-features',
			// 	parentKey: 'products',
			// },
			// {
			// 	key: 'pages-profile',
			// 	label: 'Profile',
			// 	url: '/pages/profile',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'pages-timeline',
			// 	label: 'Timeline',
			// 	url: '/pages/timeline',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'pages-invoice',
			// 	label: 'Invoice',
			// 	url: '/pages/invoice',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'pages-faq',
			// 	label: 'FAQ',
			// 	url: '/pages/faq',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'pages-pricing',
			// 	label: 'Pricing',
			// 	url: '/pages/pricing',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'pages-maintenance',
			// 	label: 'Maintenance',
			// 	url: '/pages/maintenance',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'error-404',
			// 	label: 'Error 404',
			// 	url: '/pages/error-404',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'error-404-alt',
			// 	label: 'Error 404-alt',
			// 	url: '/pages/error-404-alt',
			// 	parentKey: 'pages',
			// },
			// {
			// 	key: 'error-500',
			// 	label: 'Error 500',
			// 	url: '/pages/error-500',
			// 	parentKey: 'pages',
			// },
		],
	},
	// {
	// 	key: 'category',
	// 	label: 'Category',
	// 	isTitle: false,
	// 	icon: BiCategoryAlt,
	// 	children: [
	// 		{
	// 			key: 'icons-remix',
	// 			label: 'Sub-Category',
	// 			url: '/',
	// 			parentKey: 'category',
	// 		},
	// 	],
	// },
	{
		key: 'shippings',
		label: 'Shippings',
		isTitle: false,
		icon: MdLocalShipping,
		children: [
			{
				key: 'all-shippings',
				label: 'All Shippings',
				url: '/',
				parentKey: 'shippings',
			},
		],
	},
	{
		key: 'orders',
		label: 'Orders',
		isTitle: false,
		icon: MdOutlineRequestQuote,
		children: [
			{
				key: 'orders-all',
				label: 'All Orders',
				url: '/',
				parentKey: 'orders',
			},
		],
	},
	{
		key: 'users',
		label: 'User Management',
		isTitle: false,
		icon: FaUsers,
		children: [
			{
				key: 'View',
				label: 'All Users',
				url: '/user/user-all',
				parentKey: 'users',
			},
			{
				key: 'Create',
				label: 'Add New User',
				url: '/user/user-create',
				parentKey: 'users',
			},
			{
				key: 'View',
				label: 'All Roles',
				url: '/user/role-all',
				parentKey: 'users',
			},
			{
				key: 'Create',
				label: 'Add New Roles',
				url: '/user/roles',
				parentKey: 'users',
			},
		],
	},
	{
		key: 'inventory',
		label: 'Inventory',
		isTitle: false,
		icon: FaWarehouse,
		children: [
			{
				key: 'inventory-all',
				label: 'All Inventory',
				url: '/',
				parentKey: 'inventory',
			},
		],
	},
	{
		key: 'policies',
		label: 'Policies',
		isTitle: false,
		icon: HiClipboardDocumentList,
		children: [
			{
				key: 'return-policy',
				label: 'Return Policy',
				url: '/',
				parentKey: 'policies',
			},
			{
				key: 'employ-policy',
				label: 'Employ Policy',
				url: '/',
				parentKey: 'policies',
			},
			{
				key: 'customer-policy',
				label: 'Customer Policy',
				url: '/',
				parentKey: 'policies',
			},
		],
	},
	{
		key: 'settings',
		label: 'Settings',
		isTitle: false,
		icon: IoSettingsSharp,
		children: [
			{
				key: 'Update',
				label: 'Basic Settings',
				url: '/settings/basic-setting',
				parentKey: 'settings',
			},
		],
	},
	{
		key: 'customers',
		label: 'Customers',
		isTitle: false,
		icon: VscOrganization,
		children: [
			{
				key: 'customer-all',
				label: 'All Customers',
				url: '/',
				parentKey: 'customers',
			},
		],
	},
]

const HORIZONTAL_MENU_ITEMS: Array<any> = []
export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS }
