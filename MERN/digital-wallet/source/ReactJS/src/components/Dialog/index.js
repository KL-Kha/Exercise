import React from 'react'
import styles from './Dialog.module.scss'
import { RiCloseLine } from 'react-icons/ri'

const Dialog = ({ setIsOpen, message, setOption }) => {
	const handleYes = () => {
		setOption(true)
		setIsOpen(false)
	}

	const handleNo = () => {
		setOption(false)
		setIsOpen(false)
	}

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Dialog</h5>
					</div>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
						<RiCloseLine style={{ marginBottom: '-3px' }} />
					</button>
					<div className={styles.modalContent}>{message}</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button className={styles.deleteBtn} onClick={() => handleYes()}>
								Có
							</button>
							<button className={styles.cancelBtn} onClick={() => handleNo()}>
								Không
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dialog
