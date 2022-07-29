import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import styles from './FeatureCard.module.scss'

function FeatureCard() {
	const navigate = useNavigate()
	return (
		<div className={clsx('me-5 mt-5', styles.content)}>
			<button className={clsx('', styles.information)} onClick={() => navigate('/transactions/buy-phone')}>
				{/* <span className={clsx('', styles.title)}>Số dư Meme</span> */}
			</button>
			<div className={clsx('', styles.footer)}>
				<span className={clsx('', styles.title)}>Nạp tiền điện thoại với Meme</span>
			</div>
		</div>
	)
}

export default FeatureCard
