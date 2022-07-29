import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useState } from 'react'

import styles from './ActivityItemModal.module.scss'
import MainContent from './MainContent'
import PhoneResult from './PhoneResult'

const ActivityItemModal = ({ setIsOpen, item, name, type }) => {
	const [isOpenPhoneResult, setIsOpenPhoneResult] = useState(false)

	const handleOpenPhoneResult = () => {
		if (!isOpenPhoneResult) {
			return <MainContent item={item} name={name} type={type} setIsOpenPhoneResult={setIsOpenPhoneResult} />
		} else {
			return <PhoneResult cards={item.transaction_note} />
		}
	}

	const handleClose = () => {
		if (isOpenPhoneResult) {
			setIsOpenPhoneResult(false)
		} else {
			setIsOpen(false)
		}
	}

	return (
		<div>
			<div className={clsx('', styles.darkBG)} onClick={() => setIsOpen(false)} />
			<div className={clsx('', styles.centered)}>
				<button className={styles.closeBtn} onClick={() => handleClose()}>
					<RiCloseLine style={{ marginBottom: '-3px' }} />
				</button>
				<div className={clsx('', styles.modal)}>
					<div className={clsx('', styles.modalHeader)}>
						<div className={styles.heading}>
							<img src="/logo.png" alt="logo" />
						</div>
					</div>
					<div className={styles.modalContent}>{handleOpenPhoneResult()}</div>
				</div>
			</div>
		</div>
	)
}

export default ActivityItemModal
