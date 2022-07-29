import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../../API'
import styles from './PendingAccount.module.scss'
import PendingAccountModal from '../../../../../components/AdminModal/PendingAccountModal'

function PendingAccount() {
	const [IsOpen, setIsOpen] = useState(false)
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [pendingAccount, setPendingAccount] = useState([])
	const [updatingAccount, setUpdatingAccount] = useState([])
	const [account, setAccount] = useState({})

	useEffect(() => {
		let tmp = []
		axios
			.get(API.adminManagerGetAccountByState + '/3', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setUpdatingAccount(res.data.data)
			})
			.catch((err) => {})
		axios
			.get(API.adminManagerGetAccountByState + '/0', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setPendingAccount(res.data.data)
			})
			.catch((err) => {})
	}, [])

	const handleOpen = (item) => {
		setAccount(item)
		setIsOpen(true)
	}

	const handleRender = () => {
		const list = [...updatingAccount, ...pendingAccount]
		return pendingAccount.length + updatingAccount.length > 0 ? (
			list.map((item, index) => (
				<tr key={index} onClick={() => handleOpen(item)}>
					<td>{item.username}</td>
					<td>{item.full_name}</td>
					<td>{item.email}</td>
					<td>{item.phone_number}</td>
					<td>{item.state === 3 ? 'Chờ cập nhật' : 'Chờ kích hoạt'}</td>
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
				<td>{IsOpen && <PendingAccountModal account={account} setIsOpen={setIsOpen} />}</td>
			</tr>
		</tbody>
	)
}

export default PendingAccount
