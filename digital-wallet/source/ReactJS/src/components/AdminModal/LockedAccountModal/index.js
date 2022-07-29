import clsx from 'clsx'
import { RiCloseLine } from 'react-icons/ri'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import API from '../../../API'
import styles from './LockedAccountModal.module.scss'
import AccoutDetail from '../components/AccountDetail'
import AccountLockedDetail from '../components/AccountLockedDetail'

function LockedAccountModal({ setIsOpen, account }) {
	const [cookies, setCookies] = useCookies(['adminToken'])
	const handleUnlock = () => {
		axios
			.put(
				API.adminAccountManagementUnBanAccount,
				{
					username: account.username,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.adminToken}`,
					},
				},
			)
			.then(() => {
				toast('Mở khóa tài khoản thành công', { type: 'success' })
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
					<div className={clsx('', styles.modalHeader)}></div>
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
								<h3 className={styles.title}>Ghi nhận đăng nhập bất thường</h3>
							</div>
							<div className={clsx('', styles.modalBody)}>
								<AccountLockedDetail />
							</div>
							<div className={clsx('', styles.modalTitle)}>
								<h3 className={styles.title}>Thao tác</h3>
							</div>
							<div className={clsx('', styles.modalBody)}>
								<button className={styles.unlockBtn} onClick={() => handleUnlock()}>
									Mở khóa tài khoản
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LockedAccountModal
