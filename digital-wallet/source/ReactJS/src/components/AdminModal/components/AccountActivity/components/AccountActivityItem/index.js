import clsx from 'clsx'

import { transformMoney } from '../../../../../../utils'
import styles from './AccountActivityItem.module.scss'

function AccountActivityItem({ item }) {
	const convertType = (type) => {
		if (type === 0) {
			return 'Nạp tiền'
		}
		if (type === 1) {
			return 'Rút tiền'
		}
		if (type === 2) {
			return 'Chuyển tiền'
		}
		if (type === 3) {
			return 'Nhận tiền'
		}
		if (type === 4) {
			return 'Thanh toán dịch vụ'
		}
	}
	const convertName = (type) => {
		if (type === 0) {
			return 'Ngân hàng'
		}
		if (type === 1) {
			return 'Ngân hàng'
		}
		if (type === 2) {
			return item.send_to
		}
		if (type === 3) {
			return item.send_from
		}
		if (type === 4) {
			return 'Nhà mạng'
		}
	}
	return (
		<div className={clsx('row', styles.wrapper)}>
			<div
				className={clsx('col-lg-1 col-md-1 col-sm-1', styles.logo)}
				style={
					{
						// display: 'none',
					}
				}
			></div>
			<div className="col-lg-10 col-md-10 col-sm-10">
				<div className="d-flex justify-content-between">
					<div className={styles.content}>
						<span className={clsx('d-block', styles.transactionName)}>
							{convertName(item.transaction_type)}
						</span>
						<span className={clsx('d-block', styles.transactionDate)}>
							{item.transaction_time.split('T')[0]}
						</span>
						<span className={clsx('d-block', styles.transactionStatus)}>
							{convertType(item.transaction_type)}
						</span>
					</div>
					<span className={clsx('', styles.price)}>- {transformMoney(item.amount)} đ</span>
				</div>
			</div>
		</div>
	)
}

export default AccountActivityItem
