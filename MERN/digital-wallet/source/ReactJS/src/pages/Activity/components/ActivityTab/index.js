import clsx from 'clsx'
import ActivityItem from '../ActivityItem'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'

import API from '../../../../API'
import styles from './ActivityTab.module.scss'

function ActivityTab({ title, type, activity }) {
	const [cookies, setCookies] = useCookies(['token'])
	const [id, setId] = useState('')

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

	return (
		<div className={clsx('', styles.tab)}>
			<div className={clsx('', styles.tabHeader)}>
				<span>{title}</span>
			</div>
			<div className={clsx('', styles.tabContent)}>
				{activity.map((item, index) => (
					<ActivityItem key={index} item={item} userId={id} />
				))}
			</div>
		</div>
	)
}

export default ActivityTab
