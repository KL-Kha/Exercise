import clsx from 'clsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import API from '../../API'
import styles from './SignIn.module.scss'
import ChangePassword from '../../components/ChangePassword'

function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [cookies, setCookie, removeCookie] = useCookies(['token'])
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()
	const [user, setUser] = useState('')
	const [errorCount, setErrorCount] = useState(0)

	const handleSubmit = () => {
		if (validate()) {
			axios
				.post(API.login, {
					username,
					password,
				})
				.then((res) => {
					if (res.status) {
						setCookie('token', res.data.accessToken, { path: '/' })
						getInformation(res.data.accessToken)
					} else {
						toast.error(res.data.message)
					}
				})
				.catch((err) => {
					toast.error(err.response.data.message)
				})
		}
	}

	const getInformation = (token) => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					if (res.data.data.role === 0) {
						if (res.data.data.is_changed_password === 0) {
							setIsOpen(true)
						} else {
							toast('Welcome back!')
							navigate('/')
						}
					} else {
						removeCookie('token')
						toast('Bạn không có quyền truy cập')
					}
				}
			})
			.catch((err) => {
				removeCookie('token')
				toast('Bạn không có quyền truy cập')
			})
	}

	const validate = () => {
		const error = document.getElementById('signin-error-1')
		if (password.length !== 6) {
			error.innerHTML = 'Mật khẩu phải có đúng 6 ký tự'
			return false
		} else if (username.length < 10) {
			error.innerHTML = 'Tên đăng nhập phải có ít nhất 10 ký tự'
			return false
		}
		return true
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<img src="/logo.png" alt="logo" />
				</div>
				<div className={styles.form}>
					<input
						type="text"
						className="form-control"
						value={username}
						placeholder="Username hoặc số điện thoại"
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
				<span className={clsx('mt-3', styles.error)} id="signin-error-1"></span>
				<Link className={styles.resetLink} to="/reset">
					Quên mật khẩu?
				</Link>
				<button className={styles.btnLogin} onClick={() => handleSubmit()}>
					Đăng nhập
				</button>
				<div className={styles.line}>
					<p>
						<span>hoặc</span>
					</p>
				</div>
				{isOpen && <ChangePassword setIsOpen={setIsOpen} />}
				<Link to="/signup" className={styles.btnSignUp}>
					Đăng ký
				</Link>
			</div>
		</div>
	)
}

export default SignIn
