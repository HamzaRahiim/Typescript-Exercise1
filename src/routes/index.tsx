import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'))
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'))

// // dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'))

// // pages
const ProfilePages = React.lazy(() => import('../pages/other/Profile/'))
// const InvoicePages = React.lazy(() => import('../pages/other/Invoice'))
// const FAQPages = React.lazy(() => import('../pages/other/FAQ'))
// const PricingPages = React.lazy(() => import('../pages/other/Pricing'))
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))
// const StarterPages = React.lazy(() => import('../pages/other/Starter'))
const ContactListPages = React.lazy(() => import('../pages/other/ContactList'))
const Role = React.lazy(() => import('../pages/other/Roles'))
// const TimelinePages = React.lazy(() => import('../pages/other/Timeline'))
const UsersPages = React.lazy(() => import('../pages/other/UserCreate'))
const UserUpdates = React.lazy(() => import('../pages/other/UserUpdate'))
const AllRolesUser = React.lazy(() => import('../pages/other/All_Roles'))
const RoleUpdates = React.lazy(() => import('../pages/other/RoleUpdate'))
const Categories = React.lazy(() => import('../pages/products/Categories'))
const Products = React.lazy(() => import('../pages/products/Products'))
const SubCategory = React.lazy(() => import('../pages/products/SubCategory'))
const Brands = React.lazy(() => import('../pages/products/Brands'))
const CreateProduct = React.lazy(
	() => import('../pages/products/CreateProduct')
)
// const Variations = React.lazy(() => import('../pages/products/Variations'))
const ProductVariations = React.lazy(
	() => import('../pages/products/ProductVariations')
)

// // base ui
// const Accordions = React.lazy(() => import('../pages/ui/Accordions'))
// const Alerts = React.lazy(() => import('../pages/ui/Alerts'))
// const Avatars = React.lazy(() => import('../pages/ui/Avatars'))
// const Badges = React.lazy(() => import('../pages/ui/Badges'))
// const Breadcrumb = React.lazy(() => import('../pages/ui/Breadcrumb'))
// const Buttons = React.lazy(() => import('../pages/ui/Buttons'))
// const Cards = React.lazy(() => import('../pages/ui/Cards'))
// const Carousel = React.lazy(() => import('../pages/ui/Carousel'))
// const Collapse = React.lazy(() => import('../pages/ui/Collapse'))
// const Dropdowns = React.lazy(() => import('../pages/ui/Dropdowns'))
// const EmbedVideo = React.lazy(() => import('../pages/ui/EmbedVideo'))
// const Grid = React.lazy(() => import('../pages/ui/Grid'))
// const Links = React.lazy(() => import('../pages/ui/Links'))
// const ListGroup = React.lazy(() => import('../pages/ui/ListGroup'))
// const Modals = React.lazy(() => import('../pages/ui/Modals'))
// const Notifications = React.lazy(() => import('../pages/ui/Notifications'))
// const Offcanvas = React.lazy(() => import('../pages/ui/Offcanvas'))
// const Placeholders = React.lazy(() => import('../pages/ui/Placeholders'))
// const Pagination = React.lazy(() => import('../pages/ui/Pagination'))
// const Popovers = React.lazy(() => import('../pages/ui/Popovers'))
// const Progress = React.lazy(() => import('../pages/ui/Progress'))
// const Spinners = React.lazy(() => import('../pages/ui/Spinners'))
// const Tabs = React.lazy(() => import('../pages/ui/Tabs'))
// const Tooltips = React.lazy(() => import('../pages/ui/Tooltips'))
// const Typography = React.lazy(() => import('../pages/ui/Typography'))
// const Utilities = React.lazy(() => import('../pages/ui/Utilities'))
const BasicSettings = React.lazy(
	() => import('@/pages/other/settings/BasicSetting')
)
// // extended ui
// const Portlets = React.lazy(() => import('../pages/extended/Portlets'))
// const RangeSlider = React.lazy(() => import('../pages/extended/RangeSlider'))
// const Scrollbar = React.lazy(() => import('../pages/extended/ScrollBar'))

// // // icons
// const RemixIcons = React.lazy(() => import('../pages/ui/icons/RemixIcons'))
// const BootstrapIcons = React.lazy(
// 	() => import('../pages/ui/icons/BootstrapIcons')
// )
// const MaterialIcons = React.lazy(
// 	() => import('../pages/ui/icons/MaterialIcons')
// )

// // charts
// const ApexCharts = React.lazy(() => import('../pages/charts/ApexCharts'))
// const SparklineCharts = React.lazy(
// 	() => import('../pages/charts/SparklinesCharts')
// )
// const ChartJs = React.lazy(() => import('../pages/charts/ChartJsCharts'))

// // // forms
// const BasicElements = React.lazy(
// 	() => import('../pages/ui/forms/BasicElements')
// )
// const FormAdvanced = React.lazy(() => import('../pages/ui/forms/FormAdvanced'))
// const Validation = React.lazy(() => import('../pages/ui/forms/Validation'))
// const Wizard = React.lazy(() => import('../pages/ui/forms/Wizard'))
// const FileUploads = React.lazy(() => import('../pages/ui/forms/FileUploads'))
// const Editors = React.lazy(() => import('../pages/ui/forms/Editors'))
// const ImageCrop = React.lazy(() => import('../pages/ui/forms/ImageCrop'))
// const Editable = React.lazy(() => import('../pages/ui/forms/Editable'))

// // // tables
// const BasicTables = React.lazy(() => import('../pages/ui/tables/BasicTables'))
// const DataTables = React.lazy(() => import('../pages/ui/tables/DataTables'))

// // // maps
// const GoogleMaps = React.lazy(() => import('../pages/ui/maps/GoogleMaps'))
// const VectorMaps = React.lazy(() => import('../pages/ui/maps/VectorMaps'))

// // // error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
// const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/admin',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
		},
	],
}

// pages
const customPagesRoutes = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/profile/',
			name: 'Profile',
			element: <ProfilePages />,
			route: PrivateRoute,
		},
		{
			path: '/user/user-all',
			name: 'Contact List',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="View">
					<ContactListPages />
				</PrivateRoute>
			),
		},
		{
			path: '/user/user-create',
			name: 'Create User',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="Create">
					<UsersPages />
				</PrivateRoute>
			),
		},
		{
			path: '/user/update/:id',
			name: 'User Update',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="Update">
					<UserUpdates />
				</PrivateRoute>
			),
		},
		{
			path: '/user/roles/',
			name: 'Roles',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="Create">
					<Role />
				</PrivateRoute>
			),
		},
		{
			path: '/user/role-all/',
			name: 'All Roles',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="View">
					<AllRolesUser />
				</PrivateRoute>
			),
		},
		{
			path: '/user/update/role/:id',
			name: 'Role Update',
			element: (
				<PrivateRoute requiredPermission="Users" to_do="Update">
					<RoleUpdates />
				</PrivateRoute>
			),
		},
		{
			path: '/settings/basic-setting',
			name: 'Basic Settings',
			element: (
				<PrivateRoute requiredPermission="Settings" to_do="Update">
					<BasicSettings />
				</PrivateRoute>
			),
		},
		// ************ Products Pages *********************
		{
			path: '/products/all-product',
			name: 'All Products',
			element: (
				<PrivateRoute requiredPermission="Products">
					<Products />
				</PrivateRoute>
			),
		},
		{
			path: '/products/add-product',
			name: 'Add Product',
			element: (
				<PrivateRoute requiredPermission="Products" to_do="Create">
					<CreateProduct />
					{/* <StarterPages /> */}
				</PrivateRoute>
			),
		},
		{
			path: '/products/categories',
			name: 'Products Categories',
			element: (
				<PrivateRoute requiredPermission="Products" to_do="View">
					<Categories />
				</PrivateRoute>
			),
		},
		{
			path: 'products/sub-category',
			name: 'Products Sub Categories',
			element: (
				<PrivateRoute requiredPermission="Products" to_do="View">
					<SubCategory />
				</PrivateRoute>
			),
		},
		{
			path: '/products/brand',
			name: 'Products Brands',
			element: (
				<PrivateRoute requiredPermission="Products" to_do="View">
					<Brands />
				</PrivateRoute>
			),
		},
		{
			path: '/products/variation',
			name: 'Product Variation',
			element: (
				<PrivateRoute requiredPermission="Products" to_do="View">
					<ProductVariations />
				</PrivateRoute>
			),
		},
	],
}

// ui
const uiRoutes: RoutesProps = {
	path: '/ui',
	name: 'Components',
	icon: 'pocket',
	header: 'UI Elements',
	children: [
		{
			path: '/ui/base',
			name: 'Base UI',
			children: [],
		},
	],
}

// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		element: <ForgotPassword />,
		route: Route,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route,
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, customPagesRoutes, uiRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}
