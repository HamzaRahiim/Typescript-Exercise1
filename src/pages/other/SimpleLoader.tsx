import { Spinner } from 'react-bootstrap'

const SimpleLoader = () => {
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
export default SimpleLoader
