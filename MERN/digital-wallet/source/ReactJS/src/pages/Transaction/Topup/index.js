import clsx from 'clsx'
import { useState } from 'react'

import styles from './Topup.module.scss'
import CreditInput from '../../../components/CreditInput'

import { transformMoney } from '../../../utils'
import { CheckCookie } from '../../../utils'

function Topup() {
	const [isOpen, setIsOpen] = useState(false)
	const [money, setMoney] = useState('')

	const handleSubmit = () => {
		const error = document.getElementById('topup-error-1')
		if (money === '') {
			error.innerHTML = 'Vui lòng nhập số tiền'
			return
		} else if (money < 10000) {
			error.innerHTML = 'Số tiền phải lớn hơn 10000'
			return
		} else {
			error.innerHTML = ''
			setIsOpen(true)
		}
	}

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.title)}>
						<span>Nạp tiền vào tài khoản</span>
						<span className={clsx('mt-3', styles.error)} id="topup-error-1"></span>
					</div>
					<input
						value={money}
						onChange={(e) => setMoney(e.target.value)}
						type="number"
						className={clsx('d-block', styles.moneyInput)}
						placeholder="Nhập số tiền cần nạp"
					></input>
					<div className={clsx('', styles.recommendNav)}>
						<button className={clsx('', styles.reconmendTab)} onClick={() => setMoney('10000')}>
							10.000đ
						</button>
						<button className={clsx('', styles.reconmendTab)} onClick={() => setMoney('20000')}>
							20.000đ
						</button>
						<button className={clsx('', styles.reconmendTab)} onClick={() => setMoney('50000')}>
							50.000đ
						</button>
						<button className={clsx('', styles.reconmendTab)} onClick={() => setMoney('100000')}>
							100.000đ
						</button>
						<button className={clsx('', styles.reconmendTab)} onClick={() => setMoney('500000')}>
							500.000đ
						</button>
					</div>
					<button className={clsx('', styles.submitBtn)} onClick={() => handleSubmit()}>
						<span>Tiếp theo</span>
					</button>
					{isOpen && <CreditInput money={money} status={1} setIsOpen={setIsOpen} />}
				</div>
			</div>
		</CheckCookie>
	)
}

export default Topup
