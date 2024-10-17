import configureFakeBackend from './common/api/fake-backend'
import { AuthProvider, ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'

import './assets/scss/app.scss'
import './assets/scss/icons.scss'
import { Suspense } from 'react'

configureFakeBackend()

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Suspense fallback={<div>Loading...</div>}></Suspense>
				<AllRoutes />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
