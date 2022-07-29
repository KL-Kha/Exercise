import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './Email.module.scss'

function Email({ email }) {
	return (
		<div className={clsx('', styles.content)}>
			<span className={clsx('', styles.title)}>Địa chỉ Email</span>
			<div className={clsx('d-flex justify-content-between', styles.emailArea)}>
				<span className={styles.email}>{email}</span>
				{/* <Link to="/">Chỉnh sửa</Link> */}
			</div>
		</div>
	)
}

export default Email
