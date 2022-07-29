import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../../../API'
import styles from './TransactionCard.module.scss'
import { transformMoney } from '../../../../utils'

function TransactionCard() {
	const [cookies, setCookies] = useCookies(['token'])
	const [balanceData, setBalanceData] = useState(0)
	const navigate = useNavigate()

	const handleRender = () => {
		navigate('/transactions/send-money')
	}

	useEffect(() => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					setBalanceData(res.data.data.balance)
				}
			})
			.catch((err) => {})
	}, [])

	const handleClick = () => {
		const dropdownMenu = document.getElementById('dropdownmenu')
		if (dropdownMenu.classList.contains('d-none')) {
			dropdownMenu.classList.remove('d-none')
		} else {
			dropdownMenu.classList.add('d-none')
		}
	}

	return (
		<div className={clsx('me-5', styles.content)}>
			<div className={clsx('d-flex justify-content-between')}>
				<span className={clsx('', styles.title)}>Số dư Meme</span>
				<button className={clsx('', styles.dropdownToggle)} onClick={handleClick}>
					<span>
						<i className={clsx('fas fa-ellipsis-v', styles.ellipsis)} />
					</span>
					<div id="dropdownmenu" className={clsx('d-none', styles.dropdownMenu)}>
						<Link to="/" className={clsx('', styles.dropdownItem)}>
							Quản lý tiền tệ
						</Link>
					</div>
				</button>
			</div>
			<span className={clsx('d-block', styles.money)}>{transformMoney(balanceData)} đ</span>
			<span className={clsx('d-block', styles.status)}>Khả dụng</span>
			<button className={clsx('mt-5', styles.transactionBtn)} onClick={() => handleRender()}>
				chuyển tiền
			</button>
		</div>
	)
}

export default TransactionCard
