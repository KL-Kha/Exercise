import clsx from 'clsx'
import { RiCloseLine } from 'react-icons/ri'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import API from '../../../API'
import styles from './PendingAccountModal.module.scss'
import AccoutDetail from '../components/AccountDetail'

function PendingAccountModal({ setIsOpen, account }) {
	const [cookies, setCookies] = useCookies(['adminToken'])
	const options = (state) => {
		axios
			.put(
				API.adminAccountManagementUpdateAccountState,
				{
					state: state,
					username: account.username,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.adminToken}`,
					},
				},
			)
			.then(() => {
				if (state === 1) {
					toast('Kích hoạt tài khoản thành công', { type: 'success' })
				} else if (state === 2) {
					toast('Đã vô hiệu hóa tài khoản', { type: 'error' })
				} else if (state === 3) {
					toast('Đã gửi yêu cầu cập nhật tài khoản', { type: 'success' })
				}
				window.location.reload()
				setIsOpen(false)
			})
	}

	const handleHide = () => {
		if (account.state === 0) {
			return (
				<button className={clsx(styles.button, styles.lack)} onClick={() => options(3)}>
					Yêu cầu bổ sung thông tin
				</button>
			)
		}
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
						<h5 className={styles.heading}>Chi tiết tài khoản</h5>
					</div>
					<div className={clsx('row', styles.modalContent)}>
						<div className={clsx('col-lg-6 col-dm-6 col-sm-12')}>
							<div className={clsx('', styles.modalTitle)}>
								<h3 className={styles.title}>Chi tiết tài khoản</h3>
							</div>
							<div className={clsx('', styles.modalBody)}>
								<AccoutDetail account={account} />
							</div>
						</div>
						<div className={clsx('col-lg-6 col-dm-6 col-sm-12')}>
							<div className={clsx('', styles.modalTitle)}>
								<h3 className={styles.title}>Thao tác</h3>
								<div className={clsx('', styles.modalBody)}>
									<button className={clsx(styles.button, styles.approve)} onClick={() => options(1)}>
										Duyệt
									</button>
									<button className={clsx(styles.button, styles.reject)} onClick={() => options(2)}>
										Từ chối
									</button>
									{handleHide()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PendingAccountModal
