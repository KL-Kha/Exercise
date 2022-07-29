import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import API from '../../../../../API'
import styles from './TransactionList.module.scss'
import { transformMoney } from '../../../../../utils'
import TransactionItemModal from '../../../../../components/AdminModal/TransactionItemModal'

function TransactionList() {
	const [IsOpen, setIsOpen] = useState(false)
	const [cookies, setCookies] = useCookies(['adminToken'])
	const [waitingList, setWaitingList] = useState([])
	const [transfer, setTransfer] = useState({})

	useEffect(() => {
		axios
			.get(API.adminTranferManagerWaitingTranfer, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.adminToken}`,
				},
			})
			.then((res) => {
				setWaitingList(res.data.data)
			})
			.catch((err) => {})
	}, [])
	const handleOpen = (item) => {
		setTransfer(item)
		setIsOpen(true)
	}
	const handleRender = () => {
		return waitingList.length > 0 ? (
			waitingList.map((item, index) => (
				<tr key={index} onClick={() => handleOpen(item)}>
					<td>{item.transaction_id}</td>
					<td>{item.send_from}</td>
					<td>{transformMoney(item.amount)} đ</td>
					<td>{transformMoney(item.transaction_tax)} đ</td>
					<td>{item.transaction_time.split('T')[0]}</td>
					<td>Đang chờ xét</td>
				</tr>
			))
		) : (
			<tr>
				<td colSpan="5">Không có giao dịch nào</td>
			</tr>
		)
	}

	return (
		<tbody className={styles.account}>
			{handleRender()}
			<tr className={styles.hNone}>
				<td>{IsOpen && <TransactionItemModal transfer={transfer} setIsOpen={setIsOpen} />}</td>
			</tr>
		</tbody>
	)
}

export default TransactionList
