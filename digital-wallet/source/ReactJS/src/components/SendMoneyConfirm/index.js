import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

import styles from './SendMoneyConfirm.module.scss'
import { transformMoney } from '../../utils'
import ConfirmModal from './components/ConfirmModal'
import OtpModal from './components/OtpModal'

const SendMoneyConfirm = ({ setIsOpen, money, phone, message, email, receiver }) => {
	const [page, setPage] = useState(1)
	const [isCost, setIsCost] = useState(false)
	const [totalCost, setTotalCost] = useState(money)
	const [isVat, setIsVat] = useState(0)

	const handlePage = () => {
		if (page === 1) {
			return (
				<ConfirmModal
					email={email}
					receiver={receiver}
					setIsCost={setIsCost}
					setPage={setPage}
					setIsOpen={setIsOpen}
					setTotalCost={setTotalCost}
					money={totalCost}
					phone={phone}
					message={message}
					isVat={isVat}
					setIsVat={setIsVat}
				/>
			)
		} else {
			return (
				<OtpModal
					setIsOpen={setIsOpen}
					isVat={isVat}
					isCost={isCost}
					setPage={setPage}
					money={totalCost}
					phone={phone}
					message={message}
				/>
			)
		}
	}

	return (
		<div>
			<div className={clsx('', styles.darkBG)} />
			<div className={clsx('', styles.centered)}>
				<div className={clsx('', styles.modal)}>
					{/* <ConfirmModal setIsOpen={setIsOpen} money={money} phone={phone} message={message} /> */}
					{/* <OtpModal setIsOpen={setIsOpen} money={money} phone={phone} message={message} /> */}
					{handlePage()}
				</div>
			</div>
		</div>
	)
}

export default SendMoneyConfirm
