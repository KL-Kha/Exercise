import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useState } from 'react'

import styles from './ForgetPasswordModal.module.scss'
import OTPModal from './components/OTPModal'
import ChangePasswordModal from './components/ChangePasswordModal'

const ForgetPasswordModal = ({ setIsOpen, email, phone }) => {
	const [page, setPage] = useState(1)

	const handlePage = () => {
		if (page === 1) {
			return <OTPModal email={email} phone={phone} setIsOpen={setIsOpen} setPage={setPage} />
		} else {
			return <ChangePasswordModal />
		}
	}

	return (
		<div>
			<div className={clsx('', styles.darkBG)} />
			<div className={clsx('', styles.centered)}>
				<div className={clsx('', styles.modal)}>{handlePage()}</div>
			</div>
		</div>
	)
}

export default ForgetPasswordModal
