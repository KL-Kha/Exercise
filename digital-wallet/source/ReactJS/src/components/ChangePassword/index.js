import { RiCloseLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

import API from '../../API'
import styles from './ChangePassword.module.scss'

const ChangePassword = ({ setIsOpen }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['token'])
	const navigate = useNavigate()
	const [oldPassword, setOldPassword] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleSubmit = () => {
		if (!oldPassword) {
			showErrorPassword('Bạn chưa nhập mật khẩu cũ')
			return
		}
		if (!password) {
			showErrorNewPassword('Bạn chưa nhập mật khẩu mới')
			return
		}
		if (!confirmPassword) {
			showErrorNewPassword('Bạn chưa xác nhận mật khẩu mới')
			return
		}
		if (password.length !== 6) {
			showErrorNewPassword('Mật khẩu phải có 6 ký tự')
			return
		}
		if (password !== confirmPassword) {
			showErrorNewPassword('Mật khẩu xác nhận không khớp')
			return
		}
		if (password === oldPassword) {
			showErrorNewPassword('Mật khẩu mới không được trùng với mật khẩu cũ')
			return
		}
		axios
			.post(
				API.changePasswordRequire,
				{
					'new-password': password,
					'new-password-confirm': confirmPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				},
			)
			.then((res) => {
				if (res.status) {
					toast('Đã thay đổi mật khẩu')
					toast('Welcome back!')
					navigate('/')
				} else {
					showErrorNewPassword('Kiểm tra lại mật khẩu')
				}
			})
			.catch((err) => {})
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
		<div>
			<div className={clsx('', styles.darkBG)} onClick={() => setIsOpen(false)} />
			<div className={clsx('', styles.centered)}>
				<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
					<RiCloseLine style={{ marginBottom: '-3px' }} />
				</button>
				<div className={clsx('', styles.modal)}>
					<div className={clsx('', styles.modalHeader)}>
						<h5 className={styles.heading}>Đổi mật khẩu</h5>
					</div>
					<div className={styles.modalContent}>
						<span className={styles.modalText}>Xác nhận mật khẩu hiện tại</span>
						<input
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							type="password"
							className={clsx('form-control', styles.password)}
							placeholder="Mật khẩu hiện tại"
						/>
						<div className={clsx('mt-3', styles.error)} id="login-error-1"></div>
						<span className={styles.modalText}>
							Nhập mật khẩu mới (Để bảo mật tài khoản hơn, bạn không nên sử dụng tên của mình.)
						</span>
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
						<div className={clsx('mt-3', styles.error)} id="login-error-2"></div>
						<button className={styles.deleteBtn} onClick={() => handleSubmit()}>
							Đổi mật khẩu
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChangePassword
