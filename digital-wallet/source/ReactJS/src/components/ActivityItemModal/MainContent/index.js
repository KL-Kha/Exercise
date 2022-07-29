import clsx from 'clsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../API'
import styles from './MainContent.module.scss'
import { transformMoney } from '../../../utils'

function MainContent({ setIsOpenPhoneResult, item, name, type }) {
	const [cookies, setCookies] = useCookies(['token'])
	useEffect(() => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					const showCard = document.getElementById('showPhoneCard')
					const senderUsername = document.getElementById('senderUsername')
					const senderFullName = document.getElementById('senderFullname')
					const receiverUsername = document.getElementById('receiverUsername')
					const receiverFullName = document.getElementById('receiverFullname')
					const message = document.getElementById('message')
					if (item.transaction_type !== 4) {
						showCard.classList.add('d-none')
						if (item.transaction_type === 0) {
							senderUsername.innerHTML = 'Ngân hàng'
							senderFullName.innerHTML = ''
							receiverUsername.innerHTML = res.data.data.username
							receiverFullName.innerHTML = res.data.data.full_name
						} else if (item.transaction_type === 1) {
							senderUsername.innerHTML = res.data.data.username
							senderFullName.innerHTML = res.data.data.full_name
							receiverUsername.innerHTML = 'Ngân hàng'
							receiverFullName.innerHTML = ''
						} else if (item.transaction_type === 2) {
							senderUsername.innerHTML = res.data.data.username
							senderFullName.innerHTML = res.data.data.full_name
							receiverUsername.innerHTML = ''
							receiverFullName.innerHTML = ''
						} else if (item.transaction_type === 3) {
							senderUsername.innerHTML = ''
							senderFullName.innerHTML = ''
							receiverUsername.innerHTML = res.data.data.username
							receiverFullName.innerHTML = res.data.data.full_name
						}
						if (item.transaction_note) {
							message.innerHTML = item.transaction_note
						} else {
							message.innerHTML = 'Không có ghi chú'
						}
					} else {
						showCard.classList.remove('d-none')
						senderUsername.innerHTML = res.data.data.username
						senderFullName.innerHTML = res.data.data.full_name
						receiverUsername.innerHTML = name
						receiverFullName.innerHTML = ''
						message.innerHTML = 'Không có tin nhắn'
					}
				}
			})
			.catch((err) => {})
	}, [])

	return (
		<>
			<div className="d-flex justify-content-between">
				<span className={styles.modalText}>Từ tài khoản</span>
				<div className="d-flex flex-column w-75">
					<span id="senderUsername" className={clsx('d-block', styles.password)}>
						*****01
					</span>
					<span id="senderFullname" className={clsx('', styles.password)}>
						Ho Ngoc Thanh
					</span>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<span className={styles.modalText}>Đến tài khoản</span>
				<div className="d-flex flex-column w-75">
					<span id="receiverUsername" className={clsx('d-block', styles.password)}>
						Viettel
					</span>
					<span id="receiverFullname" className={clsx('', styles.password)}></span>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<span className={styles.modalText}>Số tiền</span>
				<div className="d-flex flex-column w-75">
					<span className={clsx('d-block', styles.password)}>{transformMoney(item.amount)} đ</span>
					<span className={clsx('', styles.password)}></span>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<span className={styles.modalText}>Nội dung</span>
				<div className="d-flex flex-column w-75">
					<span id="message" className={clsx('d-block', styles.message)}>
						aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
					</span>
					<span className={clsx('', styles.password)}></span>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<span className={styles.modalText}>Loại giao dịch</span>
				<div className="d-flex flex-column w-75">
					<span className={clsx('d-block', styles.password)}>{type}</span>
					<span
						id="showPhoneCard"
						onClick={() => setIsOpenPhoneResult(true)}
						className={clsx('', styles.moreButton)}
					>
						xem thêm
					</span>
				</div>
			</div>
			<button className={styles.deleteBtn}>Xác nhận</button>
		</>
	)
}

export default MainContent
