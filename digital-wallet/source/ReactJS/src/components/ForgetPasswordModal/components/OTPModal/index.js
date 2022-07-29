import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import OtpInput from 'react-otp-input'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

import API from '../../../../API'
import styles from './OTPModal.module.scss'
function OTPModal({ setIsOpen, setPage, email, phone }) {
	const [otp, setOtp] = useState('')
	const [cookies, setCookies] = useCookies(['forgotPasswordToken'])

	const handleSubmit = () => {
		const error = document.getElementById('changepass-error-1')
		axios
			.post(API.verifyForgotPasswordOTP, {
				phone_number: phone,
				email: email,
				'forgot-password-otp': otp,
			})
			.then((res) => {
				setCookies('forgotPasswordToken', res.data.forgotPasswordToken, { path: '/' })
				setPage(2)
			})
			.catch((err) => {
				toast('Mã OTP không đúng')
				setIsOpen(false)
			})
	}
	return (
		<>
			<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
				<RiCloseLine style={{ marginBottom: '-3px' }} />
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
				<div className={clsx('mt-3', styles.error)} id="changepass-error-1"></div>
				<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
					Xác nhận
				</button>
			</div>
		</>
	)
}

export default OTPModal
