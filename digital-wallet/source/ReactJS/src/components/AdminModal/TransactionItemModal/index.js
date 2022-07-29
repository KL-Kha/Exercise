import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import API from '../../../API'
import styles from './TransactionItemModal.module.scss'
import { transformMoney } from '../../../utils'

const TransactionItemModal = ({ setIsOpen, transfer }) => {
	console.log(transfer)
	const [cookies, setCookies] = useCookies(['adminToken'])

	const convertType = (type) => {
		if (type === 1) {
			return 'Rút tiền'
		}
		if (type === 2) {
			return 'Chuyển tiền'
		}
	}

	const options = (state) => {
		axios
			.put(API.adminTranferManagerWaitingTranfer + '/' + transfer.transaction_id + '/' + state, null, {
				headers: {
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				if (state === 'approve') {
					toast('Duyệt giao dịch thành công', { type: 'success' })
				} else if (state === 'reject') {
					toast('Từ chối giao dịch thành công', { type: 'error' })
				}
				window.location.reload()
				setIsOpen(false)
			})
	}

	return (
		<div>
			<div className={clsx('', styles.darkBG)} onClick={() => setIsOpen(false)} />
			<div className={clsx('', styles.centered)}>
				<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
					<RiCloseLine style={{ marginBottom: '-3px' }} />
				</button>
				<div className={clsx('', styles.modal)}>
					<div className={clsx('', styles.modalHeader)}>
						<div className={styles.heading}>
							<img src="/logo.png" alt="logo" />
						</div>
					</div>
					<div className={styles.modalContent}>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Từ tài khoản</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.password)}>{transfer.send_from}</span>
								<span className={clsx('', styles.password)}></span>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Đến tài khoản</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.password)}>
									{transfer.transaction_type === 1 ? 'Ngân hàng' : transfer.send_to}
								</span>
								<span className={clsx('', styles.password)}></span>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Thời gian</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.password)}>
									{transfer.transaction_time.split('T')[0]}
								</span>
								<span className={clsx('', styles.password)}></span>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Số tiền</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.password)}>
									{transformMoney(transfer.amount)} đ
								</span>
								<span className={clsx('', styles.password)}>
									{transformMoney(transfer.transaction_tax)} đ
								</span>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Nội dung</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.message)}>đã ẩn</span>
								<span className={clsx('', styles.password)}></span>
							</div>
						</div>
						<div className="d-flex justify-content-between mb-3">
							<span className={styles.modalText}>Loại giao dịch</span>
							<div className="d-flex flex-column w-75">
								<span className={clsx('d-block', styles.password)}>
									{convertType(transfer.transaction_type)}
								</span>
							</div>
						</div>
						<button className={clsx(styles.deleteBtn, styles.approve)} onClick={() => options('approve')}>
							Duyệt
						</button>
						<button className={clsx(styles.deleteBtn, styles.reject)} onClick={() => options('reject')}>
							Từ chối
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TransactionItemModal
