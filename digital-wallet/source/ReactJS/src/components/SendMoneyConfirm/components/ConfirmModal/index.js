import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

import styles from './ConfirmModal.module.scss'
import { transformMoney } from '../../../../utils'

function ConfirmModal({
	setPage,
	setIsOpen,
	money,
	phone,
	message,
	setIsCost,
	setTotalCost,
	email,
	receiver,
	isVat,
	setIsVat,
}) {
	const [vat, setVat] = useState(money)

	useEffect(() => {
		if (isVat) {
			setVat(parseInt(money) + parseInt(money * 0.05))
		} else {
			setVat(money)
		}
	}, [isVat])

	const handleSubmit = async () => {
		setTotalCost(vat)
		setPage(2)
	}

	const showErrorPassword = (text) => {
		const error = document.getElementById('login-error-1')
		error.innerText = text
	}
	const showErrorNewPassword = (text) => {
		const error = document.getElementById('login-error-2')
		error.innerText = text
	}
	return (
		<>
			<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
				<RiCloseLine style={{ marginBottom: '-3px' }} />
			</button>
			<div className={clsx('', styles.modalHeader)}>
				<h5 className={styles.heading}>Xác nhận chuyển khoản</h5>
			</div>
			<div className={styles.modalContent}>
				<span className={styles.modalText}>Thông tin tài khoản người nhận</span>
				<div className={clsx('', styles.receiverInfo)}>
					<table>
						<tbody>
							<tr>
								<td className={clsx('', styles.label)}>Họ và tên</td>
								<td className={clsx('ms-3', styles.value)}>{receiver}</td>
							</tr>
							<tr>
								<td className={clsx('', styles.label)}>Số điện thoại</td>
								<td className={clsx('ms-1', styles.value)}>{phone}</td>
							</tr>
							<tr>
								<td className={clsx('', styles.label)}>Email</td>
								<td className={clsx('ms-1', styles.value)}>{email}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<span className={clsx('d-block', styles.modalText)}>Số tiền chuyển</span>
				<span className={clsx('d-block', styles.sendAmount)}>{transformMoney(money)} đ</span>
				<span className={clsx('d-block', styles.modalText)}>Tin nhắn</span>
				<span className={clsx('d-block', styles.message)}>{message ? message : 'Không có tin nhắn'}</span>
				<div className={clsx('', styles.cardPrice)}>
					<label className={clsx('', styles.cardPriceItem)}>
						<input
							type="radio"
							name="isVat"
							checked={isVat === 1}
							onChange={() => {
								setIsVat(1)
								setIsCost(true)
							}}
						/>
						<div>
							<span>Chịu phí chuyển tiền</span>
						</div>
					</label>
					<label className={clsx('', styles.cardPriceItem)}>
						<input
							type="radio"
							name="isVat"
							checked={isVat === 0}
							onChange={() => {
								setIsVat(0)
								setIsCost(false)
							}}
						/>
						<div>
							<span>Không chịu phí chuyển tiền</span>
						</div>
					</label>
				</div>
				<span className={clsx('d-block', styles.modalText)}>Tổng tiền</span>
				<span className={clsx('d-block', styles.sendAmount)}>{transformMoney(vat)} đ</span>
				<div className={clsx('mt-3', styles.error)} id="login-error-1"></div>
				<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
					Xác nhận
				</button>
			</div>
		</>
	)
}

export default ConfirmModal
