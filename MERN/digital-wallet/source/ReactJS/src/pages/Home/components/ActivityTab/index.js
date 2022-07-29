import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../API'
import styles from './ActivityTab.module.scss'
import { transformMoney } from '../../../../utils'

function ActivityTab({ item }) {
	const [cookies, setCookies] = useCookies(['token'])
	const [id, setId] = useState('')
	let calc = '-'

	useEffect(() => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					setId(res.data.data.account_id)
				}
			})
	}, [])

	const transactionStatus = () => {
		if (item.transaction_type === 0) {
			calc = '+'
			return 'Nạp tiền'
		} else if (item.transaction_type === 1) {
			return 'Rút tiền'
		} else if (item.transaction_type === 2 && item.send_to !== id) {
			return 'Chuyển tiền'
		} else if (item.send_to === id) {
			calc = '+'
			return 'Nhận tiền'
		} else {
			return 'Thanh toán dịch vụ'
		}
	}

	const transactionName = () => {
		if (item.transaction_type === 0) {
			return 'Ngân hàng'
		} else if (item.transaction_type === 1) {
			return 'Ngân hàng'
		} else if (item.transaction_type === 2) {
			return 'Chưa có'
		} else if (item.transaction_type === 3) {
			return 'Chưa có'
		} else if (item.transaction_type === 4) {
			if (item.transaction_note.split('\n')[2].split(' ')[2][1] === '1') {
				return 'Viettel'
			} else if (item.transaction_note.split('\n')[2].split(' ')[2][1] === '2') {
				return 'Mobifone'
			} else if (item.transaction_note.split('\n')[2].split(' ')[2][1] === '3') {
				return 'Vinaphone'
			}
		}
	}

	const navigate = useNavigate()
	const handleClick = () => {
		// to page detail
		navigate('/activity')
	}

	return (
		<button className={clsx('w-100', styles.tab)} onClick={handleClick}>
			<div className="row">
				<div
					className={clsx('col-lg-1 col-md-1 col-sm-1', styles.logo)}
					style={
						{
							// display: 'none',
						}
					}
				></div>
				<div className="col-lg-10 col-md-10 col-sm-10">
					<div className="d-flex justify-content-between">
						<div className={styles.content}>
							<span className={clsx('d-block', styles.transactionName)}>{transactionName()}</span>
							<span className={clsx('d-block', styles.transactionDate)}>
								{item.transaction_time.split('T')[0]}
							</span>
							<span className={clsx('d-block', styles.transactionStatus)}>{transactionStatus()}</span>
						</div>
						<span className={clsx('', styles.price)}>
							{calc} {transformMoney(item.amount)} đ
						</span>
					</div>
				</div>
			</div>
		</button>
	)
}

export default ActivityTab
