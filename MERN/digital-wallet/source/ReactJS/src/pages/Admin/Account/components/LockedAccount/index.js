import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../../API'
import styles from './LockedAccount.module.scss'
import LockedAccountModal from '../../../../../components/AdminModal/LockedAccountModal'

function LockedAccount() {
	const [IsOpen, setIsOpen] = useState(false)
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [lockedAccount, setLockedAccount] = useState([])
	const [account, setAccount] = useState({})

	useEffect(() => {
		axios
			.get(API.adminAccountManagementGetBannedAccount, {
				headers: {
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setLockedAccount(res.data.data)
			})
			.catch((err) => {})
	}, [])

	const handleOpen = (item) => {
		setAccount(item)
		setIsOpen(true)
	}

	const handleRender = () => {
		return lockedAccount.length > 0 ? (
			lockedAccount.map((item, index) => (
				<tr key={index} onClick={() => handleOpen(item)}>
					<td>{item.username}</td>
					<td>{item.full_name}</td>
					<td>{item.email}</td>
					<td>{item.phone_number}</td>
					<td>Khóa vô thời hạn</td>
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
				<td>{IsOpen && <LockedAccountModal account={account} setIsOpen={setIsOpen} />}</td>
			</tr>
		</tbody>
	)
}

export default LockedAccount
