import clsx from 'clsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import API from '../../../API'
import styles from './Login.module.scss'

function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [cookies, setCookies] = useCookies(['adminToken'])
	const navigate = useNavigate()

	const handleSubmit = () => {
		const error = document.getElementById('login-admin-error-2')
		if (username === '') {
			error.innerHTML = 'Vui lòng nhập tên đăng nhập'
		} else if (password === '') {
			error.innerHTML = 'Vui lòng nhập mật khẩu'
		} else if (password.length !== 6) {
			error.innerHTML = 'Mật khẩu phải có 6 ký tự'
		} else {
			axios
				.post(API.login, {
					username,
					password,
				})
				.then((res) => {
					axios
						.get(API.getPersonInformation, {
							headers: {
								Authorization: `Bearer ${res.data.accessToken}`,
							},
						})
						.then((res2) => {
							if (res2.data.data.role !== 1) {
								toast('Bạn không có quyền truy cập', { type: 'error' })
							} else {
								setCookies('adminToken', res.data.accessToken, { path: '/' })
								toast('Đăng nhập thành công', { type: 'success' })
								navigate('/admin/account/default')
							}
						})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((err) => {
					toast(err.response.data.message, { type: 'error' })
				})
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<img src="/logo.png" alt="logo" />
				</div>
				<div className={styles.admin}>
					<span>ADMIN</span>
				</div>
				<div className={styles.form}>
					<input
						type="text"
						className="form-control"
						value={username}
						placeholder="Email hoặc số điện thoại"
						onChange={(e) => setUsername(e.target.value)}
					/>

					<input
						type="password"
						className="form-control"
						value={password}
						placeholder="Mật khẩu"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className={clsx('mt-3', styles.error)} id="login-admin-error-2"></div>
				<button className={styles.btnLogin} onClick={() => handleSubmit()}>
					Đăng nhập
				</button>
			</div>
		</div>
	)
}

export default SignIn
