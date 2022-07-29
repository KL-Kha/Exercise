import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../API'
import { CheckCookie } from '../../utils'
import styles from './Profile.module.scss'
import Info from './components/Info'
import Address from './components/Address'
import Email from './components/Email'
import Phone from './components/Phone'
function Profile() {
	const [cookies, setCookies] = useCookies(['token'])
	const [data, setData] = useState({})

	useEffect(() => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					res.data.data.day_of_birth = res.data.data.day_of_birth.split('T')[0]
					setData(res.data.data)
				}
			})
			.catch((err) => {})
	}, [])

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('row')}>
						<div className={clsx('col-lg-6 col-md-12 col-sm-12')}>
							<Info
								fullname={data.full_name}
								birthday={data.day_of_birth}
								identifyBack={data.identity_card_back}
								identifyFront={data.identity_card_front}
								accountType={data.state}
							/>
							<Phone number={data.phone_number} />
						</div>
						<div className={clsx('col-lg-6 col-md-12 col-sm-12')}>
							<Address address={data.address} />
							<Email email={data.email} />
						</div>
					</div>
				</div>
			</div>
		</CheckCookie>
	)
}

export default Profile
