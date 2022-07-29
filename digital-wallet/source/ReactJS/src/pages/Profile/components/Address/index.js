import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './Address.module.scss'

function Address({ address }) {
	return (
		<div className={clsx('', styles.content)}>
			<span className={clsx('', styles.title)}>Địa chỉ</span>
			<div className={clsx('d-flex justify-content-between', styles.addressArea)}>
				<span className={styles.address}>{address}</span>
				{/* <Link to="/">Chỉnh sửa</Link> */}
			</div>
		</div>
	)
}

export default Address
