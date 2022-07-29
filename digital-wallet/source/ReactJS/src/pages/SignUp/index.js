import { useState } from 'react'

import Form from './components/Form'
import UploadCard from '../../components/UploadCard'
import styles from './SignUp.module.scss'

function SignUp() {
	const [state, setState] = useState(1)
	const [data, setData] = useState({})

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.main__content}>
					<div className={styles.logo}>
						<img src="/logo.png" alt="logo" />
					</div>
					<div>
						{state === 1 ? (
							<Form setState={setState} setData={setData} />
						) : (
							<UploadCard data={data} setState={setState} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
