import clsx from 'clsx'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

import API from '../../API'
import styles from './ForgetPassword.module.scss'
import ForgetPasswordModal from '../../components/ForgetPasswordModal'

function ForgetPassword() {
	const [isOpen, setIsOpen] = useState(false)
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	const handleSubmit = () => {
		if (!email) {
			showError('Bạn chưa nhập email')
			return
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			showError('Email không hợp lệ')
			return
		} else if (!phone) {
			showError('Bạn chưa nhập số điện thoại')
			return
		} else if (!/^[0-9]{10,11}$/.test(phone)) {
			showError('Số điện thoại không hợp lệ')
			return
		} else {
			axios
				.post(API.requestForgotPasswordOTP, {
					phone_number: phone,
					email: email,
				})
				.then((res) => {
					console.log(res.data.OTP)
					showError('')
					setIsOpen(true)
				})
				.catch((err) => {
					showError('Số điện thoại và Email không đúng')
				})
		}
	}

	const showError = (text) => {
		const error = document.getElementById('login-error-1')
		error.innerText = text
	}

	return (
		<div className={styles.wrapper}>
			<div className={clsx('text-center', styles.content)}>
				<div className={styles.logo}>
					<img src="/logo.png" alt="logo" />
				</div>
				<span className={clsx('d-block', styles.title)}>Bạn cần trợ giúp về mật khẩu?</span>
				<span className={clsx('d-block', styles.desc)}>
					Nhập email mà bạn sử dụng cho PayPal và chúng tôi sẽ giúp bạn tạo mật khẩu mới.
				</span>
				<div className={styles.form}>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						className="form-control"
						placeholder="Nhập Email"
					/>
				</div>
				<div className={clsx('mt-4', styles.form)}>
					<input
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						type="email"
						className="form-control"
						placeholder="Nhập vào số điện thoại"
					/>
				</div>
				<div className={clsx('mt-3', styles.error)} id="login-error-1"></div>
				<button className={clsx(styles.btnLogin)} onClick={() => handleSubmit()}>
					Tiếp theo
				</button>
			</div>
			{isOpen && <ForgetPasswordModal email={email} phone={phone} setIsOpen={setIsOpen} />}
			<div className={styles.footer}>
				<Link className={styles.footerText} to="/signin">
					Trở lại đặng nhập
				</Link>
			</div>
		</div>
	)
}

export default ForgetPassword
