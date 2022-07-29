import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../API'
import ActivityTab from './components/ActivityTab'
import BankTab from './components/BankTab'
import FeatureCard from './components/FeatureCard'
import TransactionCard from './components/TransactionCard'
import styles from './Home.module.scss'
import { CheckCookie } from '../../utils'

function Home() {
	const [cookies, setCookies] = useCookies(['token'])
	const [activity, setActivity] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(API.digitalWalletTranferHistory, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					if (res.data.data.length >= 3) {
						setActivity([res.data.data[0], res.data.data[1], res.data.data[2]])
					} else if (res.data.data.length >= 2) {
						setActivity([res.data.data[0], res.data.data[1]])
					} else if (res.data.data.length >= 1) {
						setActivity([res.data.data[0]])
					}
				}
			})
	}, [])
	const handleClick = () => {
		const dropdownMenu = document.getElementById('maindropdownmenu')
		if (dropdownMenu.classList.contains('d-none')) {
			dropdownMenu.classList.remove('d-none')
		} else {
			dropdownMenu.classList.add('d-none')
		}
	}
	return (
		<CheckCookie>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={clsx(styles.main__content, 'row')}>
						<div className={clsx(styles.left_content, 'col-lg-6 col-md-6 col-sm-12 mt-5')}>
							<TransactionCard />
							<FeatureCard />
						</div>
						<div className={clsx(styles.right_content, 'col-lg-6 col-md-6 col-sm-12 mt-5')}>
							<div className={clsx('', styles.activity)}>
								<span className={clsx('d-block', styles.title)}>Hoạt động gần đây</span>
								{/* <ActivityTab
								transAvatar="1.png"
								transName="DigitalOcean"
								transDate="5/5/2022"
								transStatus={1}
								transAmount="500.000"
							/>
							<ActivityTab
								transAvatar="1.png"
								transName="DigitalOcean"
								transDate="5/5/2022"
								transStatus={2}
								transAmount="50.000"
							/>
							<ActivityTab
								transAvatar="1.png"
								transName="DigitalOcean"
								transDate="5/5/2022"
								transStatus={3}
								transAmount="5.000"
							/> */}
								{activity.map((item, index) => (
									<ActivityTab key={index} item={item} />
								))}
								<button className={clsx('', styles.submitBtn)} onClick={() => navigate('/activity')}>
									Hiển thị tất cả
								</button>
							</div>
							{/* <div className={clsx('mb-5', styles.bank)}>
							<div className={clsx('d-flex justify-content-between align-items-center')}>
								<span className={clsx('d-block mt-5', styles.title)}>Ngân hàng và thẻ</span>
								<button className={clsx('', styles.dropdownToggle)} onClick={handleClick}>
									<span>
										<i className={clsx('fas fa-ellipsis-v', styles.ellipsis)} />
									</span>
									<div id="maindropdownmenu" className={clsx('d-none', styles.dropdownMenu)}>
										<Link to="/" className={clsx('', styles.dropdownItem)}>
											Đi đến ngân hàng và thẻ
										</Link>
									</div>
								</button>
							</div>
							<BankTab cardType="Visa" cardNumber="106869342442" />
							<BankTab cardType="Visa" cardNumber="106869342442" />
							<button className={clsx('', styles.submitBtn)}>Liên kết thẻ hoặc ngân hàng</button>
						</div> */}
						</div>
					</div>
				</div>
			</div>
		</CheckCookie>
	)
}

export default Home
