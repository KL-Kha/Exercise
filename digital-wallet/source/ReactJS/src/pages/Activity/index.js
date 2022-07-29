import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../API'
import styles from './Activity.module.scss'
import ActivityTab from './components/ActivityTab'
import { CheckCookie } from '../../utils'

function Activity() {
	const [cookies, setCookies] = useCookies(['token'])
	const [activity, setActivity] = useState([])

	useEffect(() => {
		axios
			.get(API.digitalWalletTranferHistory, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					setActivity([...res.data.data])
				}
			})
	}, [])

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.activityTab)}>
						<ActivityTab
							title="Đã hoàn tất"
							type={0}
							activity={activity.filter((item) => item.transaction_state === 0)}
						/>
					</div>
					<div className={clsx('', styles.activityTab)}>
						<ActivityTab
							title="Đang chờ duyệt"
							type={1}
							activity={activity.filter((item) => item.transaction_state === 1)}
						/>
					</div>
					<div className={clsx('', styles.activityTab)}>
						<ActivityTab
							title="Đã hủy"
							type={2}
							activity={activity.filter((item) => item.transaction_state === 2)}
						/>
					</div>
				</div>
			</div>
		</CheckCookie>
	)
}

export default Activity
