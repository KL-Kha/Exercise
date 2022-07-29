import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Form.module.scss'

function Form({ setState, setData }) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [day, setDay] = useState('')
	const [month, setMonth] = useState('')
	const [year, setYear] = useState('')

	const handleContinue = () => {
		if (!lastName) {
			showError('Bạn chưa nhập họ')
			document.getElementById('firstName').focus()
			return
		}

		if (!firstName) {
			showError('Bạn chưa nhập tên')
			document.getElementById('lastName').focus()
			return
		}

		if (!phone) {
			showError('Bạn chưa nhập số điện thoại')
			document.getElementById('phone').focus()
			return
		}

		//regex phone
		if (!phone.match(/^[0-9]{10,11}$/)) {
			showError('Số điện thoại không hợp lệ')
			document.getElementById('phone').focus()
			return
		}

		if (!email) {
			showError('Bạn chưa nhập email')
			document.getElementById('email').focus()
			return
		}

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			showError('Email không hợp lệ')
			document.getElementById('email').focus()
			return
		}

		if (!day) {
			showError('Bạn chưa chọn ngày sinh')
			document.getElementById('day').focus()
			return
		}

		if (!month) {
			showError('Bạn chưa chọn tháng sinh')
			document.getElementById('month').focus()
			return
		}

		if (!year) {
			showError('Bạn chưa chọn năm sinh')
			document.getElementById('year').focus()
			return
		}

		if (!address) {
			showError('Bạn chưa nhập địa chỉ')
			document.getElementById('address').focus()
			return
		}

		setState(2)
		setData({
			firstName,
			lastName,
			email,
			phone,
			address,
			day,
			month,
			year,
		})
	}

	const showError = (text) => {
		const error = document.getElementById('login-error-1')
		error.classList.remove('d-none')
		error.innerText = text
	}

	const hideError = () => {
		const error = document.getElementById('login-error-1')
		error.classList.add('d-none')
	}

	return (
		<div className={styles.form}>
			<div className={clsx(styles.form__group, 'row')}>
				<div className={clsx('col-md-6 col-12', styles.name)}>
					<input
						className="form-control"
						placeholder="Họ"
						id="firstName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className={clsx('col-md-6 col-12', styles.name)}>
					<input
						className="form-control"
						placeholder="Tên"
						id="lastName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
			</div>
			<div className={clsx(styles.form__group, 'row')}>
				<div className={clsx('col', styles.phone)}>
					<input
						className="form-control"
						placeholder="Số điện thoại"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
			</div>
			<div className={clsx(styles.form__group, 'row')}>
				<div className={clsx('col', styles.email)}>
					<input
						className="form-control"
						placeholder="Email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			</div>
			<div className={clsx(styles.form__group, 'row')}>
				<div className={clsx('col-4', styles.birthday)}>
					<select id="day" className="form-control" value={day} onChange={(e) => setDay(e.target.value)}>
						<option value="" disabled>
							Ngày
						</option>
						{[...Array(31).keys()].map((item) => (
							<option key={item} value={item + 1}>
								{item + 1}
							</option>
						))}
					</select>
				</div>
				<div className={clsx('col-4', styles.birthday)}>
					<select
						id="month"
						className="form-control"
						value={month}
						onChange={(e) => setMonth(e.target.value)}
					>
						<option value="" disabled>
							Tháng
						</option>
						{[...Array(12).keys()].map((item) => (
							<option key={item} value={item + 1}>
								{item + 1}
							</option>
						))}
					</select>
				</div>
				<div className={clsx('col-4', styles.birthday)}>
					<select id="year" className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
						<option value="" disabled>
							Năm
						</option>
						{[...Array(100).keys()].map((item) => (
							<option key={item} value={item + 1922}>
								{item + 1922}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={clsx(styles.form__group, 'row')}>
				<div className={clsx('col', styles.address)}>
					<input
						className="form-control"
						placeholder="Địa chỉ"
						id="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
			</div>
			<div className={clsx('mt-3 d-none', styles.error)} id="login-error-1"></div>
			<button className={styles.btnContinue} onClick={() => handleContinue()}>
				Tiếp tục
			</button>
			<div className="text-center mt-4">
				Bạn đã có tài khoản?{' '}
				<Link className="text-decoration-none text-secondary" to="/signin">
					Đăng nhập
				</Link>
			</div>
		</div>
	)
}

export default Form
