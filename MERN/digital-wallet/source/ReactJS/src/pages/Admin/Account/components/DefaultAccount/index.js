import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../../API'
import styles from './DefaultAccount.module.scss'
import DefaultAccountModal from '../../../../../components/AdminModal/DefaultAccountModal'

function DefaultAccount() {
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [IsOpen, setIsOpen] = useState(false)
	const [defaultAccount, setDefaultAccount] = useState([])
	const [account, setAccount] = useState({})

	useEffect(() => {
		axios
			.get(API.adminManagerGetAccountByState + '/1', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setDefaultAccount(res.data.data)
			})
	}, [])

	const handleOpen = (item) => {
		setAccount(item)
		setIsOpen(true)
	}

	const handleRender = () => {
		return defaultAccount.length > 0 ? (
			defaultAccount.map((item, index) => (
				<tr key={index} onClick={() => handleOpen(item)}>
					<td>{item.username}</td>
					<td>{item.full_name}</td>
					<td>{item.email}</td>
					<td>{item.phone_number}</td>
					<td>Kích hoạt</td>
				</tr>
			))
		) : (
			<tr>
				<td colSpan="5">Không có tài khoản nào</td>
			</tr>
		)
	}

	return (
		<tbody className={styles.account}>
			{handleRender()}

			<tr className={styles.hNone}>
				<td>{IsOpen && <DefaultAccountModal account={account} setIsOpen={setIsOpen} />}</td>
			</tr>
		</tbody>
	)
}

export default DefaultAccount
