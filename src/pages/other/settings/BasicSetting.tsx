import { PageBreadcrumb } from '@/components'
import { Card } from 'react-bootstrap'

const BasicSetting = () => {
	return (
		<>
			<PageBreadcrumb title="Basic Settings" subName="Settings" />
			<Card>
				<Card.Header>
					<h2>Core Settings</h2>
				</Card.Header>
			</Card>
		</>
	)
}
export default BasicSetting
