import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import styles from './TransactionHeaderLayout.module.scss'

function TransactionHeaderLayout() {
	return (
		<div className={clsx('', styles.header)}>
			<nav className={clsx('navbar navbar-expand-lg navbar-expand-md navbar-expand-sm', styles.navbar)}>
				<div className="container">
					<div className={clsx('mx-auto', styles.nav)}>
						<div className={clsx('', styles.navList)} id="nav-transaction">
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/transactions/topup">
								Nạp tiền
							</NavLink>
							<NavLink className={clsx('nav-link mx-5', styles.pageLink)} to="/transactions/withdraw">
								Rút tiền
							</NavLink>
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/transactions/buy-phone">
								Mua thẻ điện thoại
							</NavLink>
							<NavLink className={clsx('nav-link ms-5', styles.pageLink)} to="/transactions/send-money">
								Chuyển tiền
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default TransactionHeaderLayout
