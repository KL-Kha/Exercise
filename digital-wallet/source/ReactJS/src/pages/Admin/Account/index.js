import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

import styles from './Account.module.scss'
import { CheckAdminCookie } from '../../../utils'

import DefaultAccount from './components/DefaultAccount'
import DisabledAccount from './components/DisabledAccount'
import LockedAccount from './components/LockedAccount'
import PendingAccount from './components/PendingAccount'

function Account() {
	const HandlePage = () => {
		const { pathname } = useLocation()
		if (pathname === '/admin/account/default') {
			return <DefaultAccount />
		} else if (pathname === '/admin/account/pending') {
			return <PendingAccount />
		} else if (pathname === '/admin/account/disabled') {
			return <DisabledAccount />
		} else if (pathname === '/admin/account/locked') {
			return <LockedAccount />
		}
	}
	return (
		<CheckAdminCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.table)}>
						<table>
							<thead>
								<tr>
									<th>ID tài khoản</th>
									<th>Tên tài khoản</th>
									<th>Email</th>
									<th>Số điện thoại</th>
									<th>Trạng thái</th>
								</tr>
							</thead>
							{HandlePage()}
						</table>
					</div>
				</div>
			</div>
		</CheckAdminCookie>
	)
}

export default Account
