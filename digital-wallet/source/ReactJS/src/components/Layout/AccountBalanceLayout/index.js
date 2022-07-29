import clsx from 'clsx'
import React, { useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../../API'
import styles from './AccountBalanceLayout.module.scss'
import { convert } from '../../../utils'

function AccountBalanceLayout({ children }) {
	const [cookies, setCookies] = useCookies(['token'])
	const [balanceData, setBalanceData] = useState(0)

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

	return (
		<div className={clsx('', styles.wrapper)}>
			<div className={clsx('row', styles.content)}>
				<div className={clsx('col-lg-8 col-md-8 col-sm-12')}>{children}</div>
				<div className={clsx('col-lg-4 col-md-4 col-sm-12')}>
					<div className={clsx('', styles.balanceCard)}>
						<div className={clsx('', styles.balanceCardLogo)}>
							<img src="/logo.png" alt="logo" />
						</div>
						<div className={clsx('', styles.balanceCardText)}>
							<span className={clsx('d-block', styles.title)}>Số dư của bạn</span>
							<span className={clsx('d-block', styles.balance)}>{convert(balanceData)} đ</span>
							<span className={clsx('', styles.status)}>Khả dụng</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountBalanceLayout
