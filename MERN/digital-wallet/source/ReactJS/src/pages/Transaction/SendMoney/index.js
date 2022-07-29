import clsx from 'clsx'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../../API'
import styles from './SendMoney.module.scss'
import SendMoneyConfirm from '../../../components/SendMoneyConfirm'
import { CheckCookie } from '../../../utils'

function SendMoney() {
	const [isOpen, setIsOpen] = useState(false)
	const [money, setMoney] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [receiver, setReceiver] = useState('')
	const [message, setMessage] = useState('')
	const [cookies, setCookies] = useCookies(['token'])

	const validate = () => {
		const error = document.getElementById('sendmoney-error-1')
		axios
			.get(API.digitalWalletTranferMoneyFind + phone, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				setEmail(res.data.data.email)
				setReceiver(res.data.data.full_name)
			})
			.catch((err) => {
				error.innerHTML = 'Số điện thoại không tồn tại'
				setIsOpen(false)
			})
		if (phone === '') {
			error.innerHTML = 'Nhập số điện thoại'
			setIsOpen(false)
		} else if (money === '') {
			error.innerHTML = 'Nhập số tiền muốn chuyển'
			setIsOpen(false)
		} else {
			error.innerHTML = ''
			setIsOpen(true)
		}
	}

	const handleSubmit = () => {
		validate()
	}

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.title)}>
						<span>Chuyển tiền</span>
						<span className={clsx('mt-3', styles.error)} id="sendmoney-error-1"></span>
					</div>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className={clsx('d-block', styles.moneyInput)}
						placeholder="Nhập số điện thoại người nhận"
					></input>
					<input
						type="number"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
						className={clsx('d-block', styles.moneyInput)}
						placeholder="Nhập số tiền muốn chuyển"
					></input>
					<textarea
						cols={30}
						rows={10}
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className={clsx('d-block', styles.messageInput)}
						placeholder="Lời nhắn cho người chuyển"
					></textarea>
					<button className={clsx('', styles.submitBtn)} onClick={() => handleSubmit()}>
						<span>Tiếp theo</span>
					</button>
					{isOpen && (
						<SendMoneyConfirm
							email={email}
							receiver={receiver}
							money={money}
							phone={phone}
							message={message}
							setIsOpen={setIsOpen}
						/>
					)}
				</div>
			</div>
		</CheckCookie>
	)
}

export default SendMoney
