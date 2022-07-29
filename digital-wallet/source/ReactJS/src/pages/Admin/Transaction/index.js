import clsx from 'clsx'

import styles from './Transaction.module.scss'
import TransactionList from './components/TransactionList'

import { CheckAdminCookie } from '../../../utils'

function Transaction() {
	return (
		<CheckAdminCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.table)}>
						<table>
							<thead>
								<tr>
									<th>ID Giao dịch</th>
									<th>ID người gửi</th>
									<th>Số tiền</th>
									<th>Phí Tax</th>
									<th>Thời gian</th>
									<th>Trạng thái</th>
								</tr>
							</thead>
							<TransactionList />
						</table>
					</div>
				</div>
			</div>
		</CheckAdminCookie>
	)
}

export default Transaction
