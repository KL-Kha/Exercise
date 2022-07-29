import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import styles from './AdminAccountHeaderLayout.module.scss'

function AdminAccountHeaderLayout() {
	return (
		<div className={clsx('', styles.header)}>
			<nav className={clsx('navbar navbar-expand-lg navbar-expand-md navbar-expand-sm', styles.navbar)}>
				<div className="container">
					<div className={clsx('mx-auto', styles.nav)}>
						<div className={clsx('', styles.navList)} id="nav-transaction">
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/admin/account/default">
								Mặc định
							</NavLink>
							<NavLink className={clsx('nav-link mx-5', styles.pageLink)} to="/admin/account/pending">
								Chờ kích hoạt
							</NavLink>
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/admin/account/disabled">
								Vô hiệu hóa
							</NavLink>
							<NavLink className={clsx('nav-link ms-5', styles.pageLink)} to="/admin/account/locked">
								Khóa vô thời hạn
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default AdminAccountHeaderLayout
