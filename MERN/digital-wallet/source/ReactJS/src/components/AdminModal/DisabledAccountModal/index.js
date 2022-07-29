import clsx from 'clsx'
import { RiCloseLine } from 'react-icons/ri'

import styles from './DisabledAccountModal.module.scss'
import AccoutDetail from '../components/AccountDetail'

function DisabledAccountModal({ setIsOpen, account }) {
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
							<div className={styles.message}>
								<h3 className={styles.title}>Tài khoản này đã bị khóa</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DisabledAccountModal
