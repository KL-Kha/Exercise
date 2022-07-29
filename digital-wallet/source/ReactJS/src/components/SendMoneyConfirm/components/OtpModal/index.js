import { TiArrowBack } from 'react-icons/ti'
import clsx from 'clsx'
import OtpInput from 'react-otp-input'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

import API from '../../../../API'
import styles from './OtpModal.module.scss'
import { transformMoney } from '../../../../utils'

function ConfirmModal({ setPage, money, phone, message, isCost, isVat, setIsOpen }) {
	const [otp, setOtp] = useState('')
	const [sendCodeCount, setSendCodeCount] = useState(0)
	const [cookies, setCookies] = useCookies(['token'])

	const showErrorPassword = (text) => {
		const error = document.getElementById('login-error-1')
		error.innerText = text
	}
	const showErrorNewPassword = (text) => {
		const error = document.getElementById('login-error-2')
		error.innerText = text
	}

	const handleOtp = async () => {
		setSendCodeCount(1)
		const otpClick = document.getElementById('otp-input').childNodes[0].childNodes[0].childNodes[0]
		otpClick.focus()
		const data = {
			'send-to': phone,
			amount: money,
			'transaction-note': message,
			'tax-pay-by': isVat,
		}
		const token = cookies.token
		const headers = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		await axios
			.post(API.digitalWalletTranferMoney, data, headers)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				toast.error(err.response.data.message)
				setIsOpen(false)
			})
	}

	const handleCodeCount = () => {
		if (sendCodeCount === 0) {
			return (
				<>
					<span className={clsx('', styles.sendCodeText)}>Nhấn gửi mã để nhận mã</span>
					<button className={clsx('', styles.sendCodeBtn)} onClick={() => handleOtp()}>
						gửi mã
					</button>
				</>
			)
		} else {
			return (
				<>
					<span className={clsx('', styles.sendCodeText)}>Mã có hiệu lực trong 1 phút</span>
				</>
			)
		}
	}

	const handleSubmit = () => {
		axios
			.post(
				API.digitalWalletTranferMoneyVerify,
				{
					OTP: otp,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				},
			)
			.then((res) => {
				if (res.status === 200) {
					toast('Gửi tiền thành công')
					setIsOpen(false)
					window.location.reload()
				}
			})
	}

	return (
		<>
			<button className={styles.closeBtn} onClick={() => setPage(1)}>
				<TiArrowBack style={{ marginBottom: '-3px' }} />
			</button>
			<div className={clsx('', styles.modalHeader)}>
				<h5 className={styles.heading}>Xác nhận mã OTP</h5>
			</div>
			<div id="otp-input" className={clsx('', styles.otpInput)}>
				<OtpInput
					isInputNum={true}
					value={otp}
					onChange={(otp) => setOtp(otp)}
					numInputs={6}
					separator={<span>-</span>}
				/>
			</div>
			<div className={styles.modalContent}>
				<div className={clsx('', styles.sendCode)}>{handleCodeCount()}</div>
				<div className={clsx('mt-3', styles.error)} id="login-error-1"></div>
				<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
					Xác nhận
				</button>
			</div>
		</>
	)
}

export default ConfirmModal
