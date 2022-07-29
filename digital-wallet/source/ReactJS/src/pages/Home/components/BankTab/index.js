import clsx from 'clsx'

import styles from './BankTab.module.scss'

function BankTab({ cardType, cardNumber }) {
	return (
		<div className={clsx('w-100', styles.tab)}>
			<div className="row">
				<div className={clsx('col-lg-1 col-md-1 col-sm-1', styles.logo)}>logo</div>
				<div className="col-lg-10 col-md-10 col-sm-10">
					<div className="d-flex justify-content-between">
						<div className={styles.content}>
							<span className={clsx('d-block', styles.transactionName)}>{cardType}</span>
							<span className={clsx('d-block', styles.transactionDate)}>
								{cardNumber.substring(0, 4)}****
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BankTab
