import clsx from 'clsx'
import { useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../../API'

import styles from './Withdraw.module.scss'
import CreditInput from '../../../components/CreditInput'
import { CheckCookie } from '../../../utils'

function Withdraw() {
	const [isOpen, setIsOpen] = useState(false)
	const [money, setMoney] = useState('')
	const [cookies, setCookies] = useCookies(['token'])

	const handleSubmit = async () => {
		const error = document.getElementById('withdraw-error-1')
		await axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					const tmp = res.data.data.last_withdraw.split('T')[0].split('-')
					if (money === '') {
						error.innerHTML = 'Vui lòng nhập số tiền'
					} else if (money < 10000) {
						error.innerHTML = 'Số tiền phải lớn hơn 10000'
					} else if (money > res.data.data.balance) {
						error.innerHTML = 'Số tiền không đủ'
					} else if (new Date(tmp[0], tmp[1] - 1, tmp[2]).getDate() + 1 === new Date().getDate()) {
						error.innerHTML = 'Bạn không thể rút tiền trong ngày hôm nay'
					} else {
						error.innerHTML = ''
						setIsOpen(true)
					}
				}
			})
	}

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.title)}>
						<span>Rút tiền khỏi tài khoản</span>
						<span className={clsx('mt-3', styles.error)} id="withdraw-error-1"></span>
					</div>
					<input
						type="number"
						value={money}
						onChange={(e) => setMoney(e.target.value)}
						className={clsx('d-block', styles.moneyInput)}
						placeholder="Nhập số tiền cần rút"
					></input>
					<button className={clsx('', styles.submitBtn)} onClick={() => handleSubmit()}>
						<span>Tiếp theo</span>
					</button>
					{isOpen && <CreditInput money={money} status={2} setIsOpen={setIsOpen} />}
				</div>
			</div>
		</CheckCookie>
	)
}

export default Withdraw
