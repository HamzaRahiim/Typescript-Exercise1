import configureFakeBackend from './common/api/fake-backend'
import { AuthProvider, ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'

import './assets/scss/app.scss'
import './assets/scss/icons.scss'
import { Suspense } from 'react'
import { SimpleLoader } from './pages/other/SimpleLoader'

configureFakeBackend()

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Suspense fallback={<SimpleLoader />}></Suspense>
				<AllRoutes />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
