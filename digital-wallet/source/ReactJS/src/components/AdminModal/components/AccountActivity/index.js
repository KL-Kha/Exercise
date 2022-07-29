import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../API'
import styles from './AccountActivity.module.scss'
import Item from './components/AccountActivityItem'

function AccountActivity({ id }) {
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [accountActivity, setAccountActivity] = useState([])

	useEffect(() => {
		axios
			.get(API.adminTransferManagerUser + '/' + id, {
				headers: {
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				console.log(res.data)
				setAccountActivity(res.data.data)
			})
	}, [])

	console.log(id)
	return (
		<div className={clsx('', styles.content)}>
			{accountActivity.map((item, index) => (
				<Item key={index} item={item} />
			))}
		</div>
	)
}

export default AccountActivity
