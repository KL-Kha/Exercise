import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import styles from './Phone.module.scss'

function Phone({ number }) {
	// const handleUpdatePhone = () => {
	// 	const phoneText = document.getElementById('phoneText')
	// 	const phoneInput = document.getElementById('phoneInput')
	// 	if (phoneText.innerHTML === '') {
	// 		setPhone(phoneInput.value)
	// 		phoneText.innerHTML = phoneInput.value
	// 		phoneInput.classList.add('d-none')
	// 	} else {
	// 		phoneText.innerHTML = ''
	// 		phoneInput.classList.remove('d-none')
	// 		phoneInput.value = phone
	// 	}
	// }

	return (
		<div className={clsx('', styles.content)}>
			<span className={clsx('', styles.title)}>Số điện thoại</span>
			<div className={clsx('d-flex justify-content-between', styles.phoneArea)}>
				<div>
					<span id="phoneText" className={styles.phone}>
						{number}
					</span>
					<input id="phoneInput" type="text" className={clsx('form-control d-none', styles.input)} />
				</div>
				{/* <button className={clsx(styles.button)} onClick={() => handleUpdatePhone()}>
					Chỉnh sửa
				</button> */}
			</div>
		</div>
	)
}

export default Phone
