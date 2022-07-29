import clsx from 'clsx'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../API'
import styles from './ChangePasswordModal.module.scss'
import { useNavigate } from 'react-router-dom'

function ChangePasswordModal() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [cookies, setCookies] = useCookies(['forgotPasswordToken'])
	const navigate = useNavigate()

	const handleSubmit = () => {
		const error = document.getElementById('changepass-error-2')
		if (password === '') {
			error.innerHTML = 'Vui lòng nhập mật khẩu'
		} else if (confirmPassword === '') {
			error.innerHTML = 'Vui lòng nhập lại mật khẩu'
		} else if (password.length !== 6) {
			error.innerHTML = 'Mật khẩu phải chứa đúng 6 ký tự'
		} else if (password !== confirmPassword) {
			error.innerHTML = 'Mật khẩu không khớp'
		} else {
			axios
				.post(
					API.changePasswordForgot,
					{
						'new-password': password,
						'new-password-confirm': confirmPassword,
					},
					{
						headers: {
							Authorization: `Bearer ${cookies.forgotPasswordToken}`,
						},
					},
				)
				.then((res) => {
					navigate('/signin')
				})
		}
	}

	return (
		<>
			<button className={styles.closeBtn}></button>
			<div className={clsx('', styles.modalHeader)}>
				<h5 className={styles.heading}>Nhập mật khẩu mới</h5>
			</div>
			<div className={styles.modalContent}>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					className={clsx('form-control', styles.password)}
					placeholder="Mật khẩu mới"
				/>
				<input
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					type="password"
					className={clsx('form-control', styles.password)}
					placeholder="Xác nhận mật khẩu mới"
				/>
				<div className={clsx('mt-3', styles.error)} id="changepass-error-2"></div>
				<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
					Xác nhận
				</button>
			</div>
		</>
	)
}

export default ChangePasswordModal
