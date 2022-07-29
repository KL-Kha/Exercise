import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import API from '../../../../API'
import styles from './Info.module.scss'

function Info({ fullname, birthday, identifyBack, identifyFront, accountType }) {
	const navigate = useNavigate()
	const [cookies, setCookies] = useCookies(['token'])

	// const handleUpdateName = () => {
	// 	const name = document.getElementById('nameText')
	// 	const nameInput = document.getElementById('nameInput')

	// 	if (name.innerHTML === '') {
	// 		setNameText(nameInput.value)
	// 		name.innerHTML = nameInput.value
	// 		nameInput.classList.add('d-none')
	// 	} else {
	// 		name.innerHTML = ''
	// 		nameInput.classList.remove('d-none')
	// 		nameInput.value = nameText
	// 	}
	// }

	// const handleUpdateBirth = () => {
	// 	const birth = document.getElementById('birthText')
	// 	const birthInput = document.getElementById('birthInput')
	// 	if (birth.innerHTML === '') {
	// 		setBirthText(date.toLocaleDateString('en-GB'))
	// 		birth.innerHTML = date.toLocaleDateString('en-GB')
	// 		birthInput.classList.add('d-none')
	// 	} else {
	// 		birth.innerHTML = ''
	// 		birthInput.classList.remove('d-none')
	// 		// split string to date
	// 		// 27/5/2021
	// 		const dateArr = birthText.split('/')
	// 		setDate(new Date(dateArr[2], dateArr[1] - 1, dateArr[0]))
	// 	}
	// }

	const handleUpdatePassword = () => {
		const oldPassword = document.getElementById('passwordInput')
		const passwordText = document.getElementById('passwordText')
		const btn = document.getElementById('password-btn')
		const error = document.getElementById('password-error')
		const newPassword = document.getElementById('newPasswordInput')
		const confirmPassword = document.getElementById('confirmPasswordInput')

		if (passwordText.innerHTML === '') {
			if (btn.innerHTML === 'Tiếp Theo') {
				btn.innerHTML = 'Cập Nhật'
				if (oldPassword.value !== '') {
					oldPassword.classList.add('d-none')
					newPassword.classList.remove('d-none')
					confirmPassword.classList.remove('d-none')
				} else {
					error.innerHTML = 'Mật Khẩu Không Được Để Trống'
				}
			} else {
				if (newPassword.value.length !== 6) {
					error.innerHTML = 'Mật Khẩu Phải Có Đúng 6 Ký Tự'
				} else if (newPassword.value === confirmPassword.value) {
					axios
						.post(
							API.changePassword,
							{
								'old-password': oldPassword.value,
								'new-password': newPassword.value,
								'new-password-confirm': confirmPassword.value,
							},
							{
								headers: {
									Authorization: `Bearer ${cookies.token}`,
								},
							},
						)
						.then((res) => {
							if (res.status) {
								toast.success('Cập Nhật Mật Khẩu Thành Công')
							} else {
								toast('Mât Khẩu Cũ Không Đúng')
							}
						})
						.catch((err) => {
							toast('Mât Khẩu Cũ Không Đúng')
						})
					oldPassword.value = ''
					newPassword.value = ''
					confirmPassword.value = ''
					newPassword.classList.add('d-none')
					confirmPassword.classList.add('d-none')
					passwordText.innerHTML = '********'
				} else {
					error.innerHTML = 'Mật Khẩu Không Trùng Khớp'
				}
			}
		} else {
			passwordText.innerHTML = ''
			oldPassword.classList.remove('d-none')
			btn.innerHTML = 'Tiếp Theo'
		}
	}

	return (
		<div className={clsx('', styles.content)}>
			<span className={clsx('', styles.title)}>Hồ sơ</span>
			<div className={clsx('row')}>
				<div className={clsx('col-lg-3 col-md-4 col-sm-12', styles.avatarArea)}>
					<div className={clsx('mb-3', styles.avatar)}></div>
				</div>
				<div className={clsx('col-lg-9 col-md-8 col-sm-12', styles.InfoArea)}>
					<table>
						<tbody>
							<tr>
								<td className={clsx('', styles.label)}>Họ và tên</td>
								<td className={clsx('ms-3', styles.value)}>
									<span id="nameText">{fullname}</span>
									<input
										id="nameInput"
										type="text"
										className={clsx('form-control d-none', styles.input)}
									/>
								</td>
								{/* <td>
									<button className={clsx('mt-1', styles.button)} onClick={() => handleUpdateName()}>
										Cập nhật
									</button>
								</td> */}
							</tr>
							<tr>
								<td className={clsx('', styles.label)}>Ngày sinh</td>
								<td className={clsx('ms-1', styles.value)}>
									<span id="birthText">{birthday}</span>
									{/* <div id="birthInput" className={clsx('d-none')}>
										<DateTimePicker
											onChange={(date) => setDate(date)}
											value={date}
											format="dd-MM-y"
										/>
									</div> */}
								</td>
								{/* <td>
									<button className={clsx('mt-1', styles.button)} onClick={() => handleUpdateBirth()}>
										Cập nhật
									</button>
								</td> */}
							</tr>
							<tr>
								<td className={clsx('', styles.label)}>CCCD</td>
								<td className={clsx('ms-1', styles.value)}>
									{accountType === 3
										? 'Chưa xác minh'
										: accountType === 1
										? 'Đã xác minh'
										: 'Đang chờ xác minh'}
								</td>
								{/* <td>
									<button className={clsx('mt-1', styles.button)}>Cập nhật</button>
								</td> */}
								{accountType === 3 && (
									<td>
										<button
											className={clsx('mt-1', styles.button)}
											onClick={() => navigate('/update-identity')}
										>
											Cập nhật
										</button>
									</td>
								)}
							</tr>
							<tr>
								<td className={clsx('', styles.label)}>Mật khẩu</td>
								<td className={clsx('ms-1', styles.value)}>
									<span id="passwordText">********</span>
									<input
										id="passwordInput"
										type="password"
										className={clsx('form-control d-none', styles.input)}
										placeholder="Nhập mật khẩu hiện tại"
									/>
									<input
										id="newPasswordInput"
										type="password"
										className={clsx('form-control d-none', styles.input)}
									/>
									<input
										id="confirmPasswordInput"
										type="password"
										className={clsx('form-control my-2 d-none', styles.input)}
									/>
									<span id="password-error" className={styles.error}></span>
								</td>
								<td>
									<button
										id="password-btn"
										className={clsx('mt-1', styles.button)}
										onClick={() => handleUpdatePassword()}
									>
										Cập nhật
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Info
