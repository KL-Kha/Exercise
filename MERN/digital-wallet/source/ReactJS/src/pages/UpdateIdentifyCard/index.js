import { useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CheckCookie } from '../../utils'
import { useCookies } from 'react-cookie'

import styles from './UpdateIdentifyCard.module.scss'

import API from '../../API'
const fileAccepted = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

function UpdateIdentifyCard() {
	const [cookies, setCookie, removeCookie] = useCookies(['token'])
	const [front, setFront] = useState('/loader_image.gif')
	const [back, setBack] = useState('/loader_image.gif')
	const [fileFront, setFileFront] = useState(null)
	const [fileBack, setFileBack] = useState(null)
	const navigate = useNavigate()

	const handleFront = (file) => {
		if (!fileAccepted.includes(file.type)) {
			showError('Ảnh chụp mặt trước không hợp lệ')
			document.getElementById('front').value = ''
			return
		}
		// 20 MB
		if (file.size > 20971520) {
			showError('Ảnh chụp mặt trước không được quá 20MB')
			document.getElementById('front').value = ''
			return
		}

		setFileFront(file)
		//create image url
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (e) => {
			setFront(e.target.result)
		}
		//revoke url
		reader.onloadend = () => {
			URL.revokeObjectURL(file)
		}
	}

	const handleBack = (file) => {
		if (!fileAccepted.includes(file.type)) {
			showError('Ảnh chụp mặt sau không hợp lệ')
			document.getElementById('back').value = ''
			return
		}

		// 20 MB
		if (file.size > 20971520) {
			showError('Ảnh chụp mặt sau không được quá 20MB')
			document.getElementById('back').value = ''
			//clear file

			return
		}
		setFileBack(file)
		//create image url
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (e) => {
			setBack(e.target.result)
		}
		//revoke url
		reader.onloadend = () => {
			URL.revokeObjectURL(file)
		}
	}

	const handleSubmit = async () => {
		validate()

		const formData = new FormData()
		formData.append('identity_card_front', fileFront)
		formData.append('identity_card_back', fileBack)

		await axios
			.put(API.updateIdentityCard, formData, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				toast('Bạn đã cập nhật thành công, chờ xác minh', { type: 'success' })
				navigate('/account')
			})
	}

	const validate = () => {
		if (!fileFront) {
			showError('Vui lòng tải ảnh chụp mặt trước')
			return
		}

		if (!fileBack) {
			showError('Vui lòng tải ảnh chụp mặt sau')
			return
		}
	}

	const showError = (text) => {
		const error = document.getElementById('login-error-2')
		error.classList.remove('d-none')
		error.innerText = text
	}

	const hideError = () => {
		const error = document.getElementById('login-error-2')
		error.classList.add('d-none')
	}

	return (
		<CheckCookie>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.main__content}>
						<div className={styles.logo}>
							<img src="/logo.png" alt="logo" />
						</div>
						<div>
							<div className={styles.upload__card}>
								<h3 className="text-center">Bạn vui lòng tải lên CCCD</h3>
								<div className="text-center border p-2">
									<div>
										<input
											id="front"
											title="Chọn ảnh"
											className="form-control d-inline-block"
											type="file"
											accept="image/*"
											onChange={(e) => handleFront(e.target.files[0])}
											onFocus={hideError}
										/>
									</div>
									<div className="mt-2">
										<img className={styles.card} src={front} alt="front" />
									</div>
								</div>
								<h3 className="text-center text-uppercase mt-3">Mặt trước</h3>
								<div className="text-center border p-2">
									<div>
										<input
											id="back"
											title="Chọn ảnh"
											className="form-control d-inline-block"
											type="file"
											accept="image/*"
											onChange={(e) => handleBack(e.target.files[0])}
											onFocus={hideError}
										/>
									</div>
									<div className="mt-2">
										<img className={styles.card} src={back} alt="front" />
									</div>
								</div>
								<h3 className="text-center text-uppercase mt-3">Mặt sau</h3>
								<div className={clsx('mt-3 d-none', styles.error)} id="login-error-2"></div>
								<button className={styles.completeSignUp} onClick={() => handleSubmit()}>
									Hoàn tất
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CheckCookie>
	)
}

export default UpdateIdentifyCard
