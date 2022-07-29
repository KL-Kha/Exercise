import clsx from 'clsx'
import { useEffect, useState } from 'react'

import styles from './PhoneResult.module.scss'
import { transformMoney } from '../../../utils'

function PhoneResult({ cards }) {
	const [price, setPrice] = useState(0)
	const [number, setNumber] = useState(0)
	const [card, setCard] = useState([])
	useEffect(() => {
		setPrice(parseInt(cards.split('\n')[1].split(' ')[2]))
		setNumber(parseInt(cards.split('\n')[0].split(' ')[2]))
		const tmpList = []
		for (let i = 0; i < parseInt(cards.split('\n')[0].split(' ')[2]); i++) {
			const tmp = cards.split('\n')[i + 2].split(' ')[2]
			tmpList.push(tmp)
		}
		setCard(tmpList)
	}, [])
	return (
		<>
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
		</>
	)
}

export default PhoneResult
