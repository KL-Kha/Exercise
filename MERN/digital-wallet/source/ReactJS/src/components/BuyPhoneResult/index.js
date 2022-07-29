import { RiCloseLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import styles from './BuyPhoneResult.module.scss'
import { transformMoney } from '../../utils'

const BuyPhoneResult = ({ setIsOpen, number, type, price, cards }) => {
	const [card, setCard] = useState([])
	const [sPrice, setSPrice] = useState(0)
	useEffect(() => {
		setSPrice(parseInt(cards.split('\n')[1].split(' ')[2]))
		const tmpList = []
		for (let i = 0; i < number; i++) {
			const tmp = cards.split('\n')[i + 2].split(' ')[2]
			tmpList.push(tmp)
		}
		setCard(tmpList)
	}, [])

	const showErrorPassword = (text) => {
		const error = document.getElementById('login-error-1')
		error.innerText = text
	}
	const showErrorNewPassword = (text) => {
		const error = document.getElementById('login-error-2')
		error.innerText = text
	}

	const handleSubmit = () => {
		window.location.reload()
		setIsOpen(false)
	}

	return (
		<div>
			<div className={clsx('', styles.darkBG)} onClick={() => setIsOpen(false)} />
			<div className={clsx('', styles.centered)}>
				<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
					<RiCloseLine style={{ marginBottom: '-3px' }} />
				</button>
				<div className={clsx('', styles.modal)}>
					<div className={clsx('', styles.modalHeader)}>
						<h5 className={styles.heading}>Mua thẻ điện thoại thành công</h5>
					</div>
					<div className={styles.modalContent}>
						<span className={styles.modalText}>Ngày mua</span>
						<span className={clsx('mb-2 d-block', styles.password)}>{new Date().toLocaleDateString()}</span>
						<span className={styles.modalText}>Tổng tiền</span>
						<span className={clsx('mb-2 d-block', styles.password)}>
							{transformMoney(price * number)} đ
						</span>
						<span className={styles.modalText}>Nhà mạng</span>
						<span className={clsx('mb-2 d-block', styles.password)}>{type}</span>
						<span className={styles.modalText}>Mã thẻ</span>
						<table className={clsx('table mt-5', styles.table)}>
							<thead>
								<tr>
									<th>STT</th>
									<th>Mã thẻ</th>
									<th>Mệnh giá</th>
								</tr>
							</thead>
							<tbody>
								{card.map((item, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item}</td>
										<td>{transformMoney(price)} đ</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className={clsx('mt-3', styles.error)} id="login-error-1"></div>
						<button className={styles.deleteBtn} onClick={handleSubmit}>
							Xác nhận
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BuyPhoneResult
