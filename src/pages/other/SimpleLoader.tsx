import { Spinner } from 'react-bootstrap'

export const SimpleLoader = () => {
	return (
		<>
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: '100vh' }}>
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
				<Spinner animation="grow" style={{ margin: '0 5px' }} />
			</div>
		</>
	)
}

export const SmallLoader = () => {
	return (
		<div className="d-flex justify-content-center align-items-center">
			<Spinner animation="grow" size="sm" style={{ margin: '0 5px' }} />
			<Spinner animation="grow" size="sm" style={{ margin: '0 5px' }} />
			<Spinner animation="grow" size="sm" style={{ margin: '0 5px' }} />
		</div>
	)
}
