import AdminHeaderLayout from '../AdminHeaderLayout'

function AdminLayout({ children }) {
	return (
		<div>
			<AdminHeaderLayout />
			<div className="container">
				<div className="content">{children}</div>
			</div>
		</div>
	)
}

export default AdminLayout
