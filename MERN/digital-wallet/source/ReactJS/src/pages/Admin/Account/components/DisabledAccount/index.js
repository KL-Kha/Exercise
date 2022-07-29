import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../../API'
import styles from './DisabledAccount.module.scss'
import DisabledAccountModal from '../../../../../components/AdminModal/DisabledAccountModal'

function DisabledAccount() {
	const [IsOpen, setIsOpen] = useState(false)
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [disabledAccount, setDisabledAccount] = useState([])
	const [account, setAccount] = useState({})

	useEffect(() => {
		axios
			.get(API.adminManagerGetAccountByState + '/2', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setDisabledAccount(res.data.data)
			})
			.catch((err) => {})
	}, [])

	const handleOpen = (item) => {
		setAccount(item)
		setIsOpen(true)
	}

	const handleRender = () => {
		return disabledAccount.length > 0 ? (
			disabledAccount.map((item, index) => (
				<tr key={index} onClick={() => handleOpen(item)}>
					<td>{item.username}</td>
					<td>{item.full_name}</td>
					<td>{item.email}</td>
					<td>{item.phone_number}</td>
					<td>Vô hiệu hóa</td>
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
				<td>{IsOpen && <DisabledAccountModal account={account} setIsOpen={setIsOpen} />}</td>
			</tr>
		</tbody>
	)
}

export default DisabledAccount
