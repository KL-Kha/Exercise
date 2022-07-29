import clsx from 'clsx'

import styles from './AccountDetail.module.scss'
import { transformMoney } from '../../../../utils'

function AccountDetail({ account }) {
	return (
		<div className={clsx('', styles.content)}>
			<table>
				<tbody>
					<tr>
						<td>ID Tài khoản</td>
						<td>{account.username}</td>
					</tr>
					<tr>
						<td>Họ và tên</td>
						<td>{account.full_name}</td>
					</tr>
					<tr>
						<td>Số dư</td>
						<td>{transformMoney(account.balance)} đ</td>
					</tr>
					<tr>
						<td>Số điện thoại</td>
						<td>{account.phone_number}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{account.email}</td>
					</tr>
					<tr>
						<td>CCCD</td>
						<td>51900690</td>
					</tr>
					<tr>
						<td>Địa chỉ</td>
						<td>{account.address}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default AccountDetail
