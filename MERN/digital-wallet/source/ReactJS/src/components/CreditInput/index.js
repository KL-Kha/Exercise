import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import axios from 'axios'

import API from '../../API'

import styles from './CreditInput.module.scss'

const CreditInput = ({ setIsOpen, money, status }) => {
	const [cardNumber, setCardNumber] = useState('')
	const [expireDate, setExpireDate] = useState('')
	const [cvv, setCvv] = useState('')
	const [cookies, setCookies] = useCookies(['token'])

	const validate = () => {
		const error = document.getElementById('credit-error-1')
		const expire = expireDate.split('/')
		if (cardNumber === '333333') {
			error.innerHTML = 'Tài khoản này không khả dụng'
			return false
		}
		if (expire.length !== 3) {
			error.innerHTML = 'Ngày hết hạn không hợp lệ'
			return false
			// } else if (expire[0] < 1 || expire[0] > 31 || expire[1] < 1 || expire[1] > 12 || expire[2] < 2019) {
			// 	error.innerHTML = 'Ngày hết hạn không hợp lệ'
			// 	return false
		} else if (new Date(expire[2], expire[1], expire[0]) < new Date()) {
			error.innerHTML = 'Ngày hết hạn không hợp lệ'
			return false
		} else if (cardNumber.length !== 6) {
			error.innerHTML = 'Số thẻ không hợp lệ'
			return false
		} else if (cvv.length !== 3) {
			error.innerHTML = 'CVV không hợp lệ'
			return false
		}
		error.innerHTML = ''
		return true
	}

	const handleSubmit = () => {
		if (validate()) {
			if (status === 1) {
				axios
					.post(
						API.digitalWalletRechangeMoney,
						{
							card_number: parseInt(cardNumber),
							day_expiry_date: parseInt(expireDate.split('/')[0]),
							month_expiry_date: parseInt(expireDate.split('/')[1]),
							year_expiry_date: parseInt(expireDate.split('/')[2]),
							cvv_code: parseInt(cvv),
							recharge_amount: money,
						},
						{
							headers: {
								Authorization: `Bearer ${cookies.token}`,
							},
						},
					)
					.then((res) => {
						if (res.status) {
							toast('Nạp tiền thành công')
							setIsOpen(false)
							window.location.reload()
						}
					})
			} else {
				axios
					.post(
						API.digitalWalletWithdrawMoney,
						{
							card_number: parseInt(cardNumber),
							day_expiry_date: parseInt(expireDate.split('/')[0]),
							month_expiry_date: parseInt(expireDate.split('/')[1]),
							year_expiry_date: parseInt(expireDate.split('/')[2]),
							cvv_code: parseInt(cvv),
							amount: money,
						},
						{
							headers: {
								Authorization: `Bearer ${cookies.token}`,
							},
						},
					)
					.then((res) => {
						if (res.status) {
							toast('Rút tiền thành công')
							setIsOpen(false)
						}
					})
			}
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
						<h5 className={styles.heading}>Nhập thông tin thẻ tín dụng</h5>
					</div>
					<div className={styles.modalContent}>
						<span className={styles.modalText}>Số thẻ tài khoản</span>
						<input
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value)}
							type="number"
							className={clsx('form-control mb-5', styles.password)}
							placeholder="Nhập số thẻ"
						/>
						<span className={styles.modalText}>Nhập Ngày hết hạn (dd/mm/yy)</span>
						<input
							value={expireDate}
							onChange={(e) => setExpireDate(e.target.value)}
							type="text"
							className={clsx('form-control mb-5', styles.password)}
							placeholder="Nhập ngày hết hạn"
						/>
						<span className={styles.modalText}>Nhập mã cvv</span>
						<input
							value={cvv}
							onChange={(e) => setCvv(e.target.value)}
							type="number"
							className={clsx('form-control', styles.password)}
							placeholder="Nhập mã cvv"
						/>
						<div className={clsx('mt-3', styles.error)} id="credit-error-1"></div>
						<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
							Xác nhận
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreditInput
