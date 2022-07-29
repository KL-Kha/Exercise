import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

import API from '../../../API'
import styles from './BuyPhone.module.scss'
import BuyPhoneResult from '../../../components/BuyPhoneResult'
import { CheckCookie } from '../../../utils'

function BuyPhone() {
	const [isOpen, setIsOpen] = useState(false)
	const [cookies, setCookies] = useCookies(['token'])
	const [number, setNumber] = useState(1)
	const [type, setType] = useState('')
	const [price, setPrice] = useState('')
	const [cards, setCards] = useState('')

	const validate = () => {
		const error = document.getElementById('buy-phone-error-1')
		if (price === '') {
			error.innerHTML = 'Vui lòng chọn mệnh giá'
			return false
		} else if (number < 1) {
			error.innerHTML = 'Số lượng phải lớn hơn 0'
			return false
		} else if (type === '') {
			error.innerHTML = 'Vui lòng chọn loại điện thoại'
			return false
		} else {
			error.innerHTML = ''
			return true
		}
	}

	const handleSubmit = () => {
		if (validate()) {
			axios
				.post(
					API.digitalWalletServicePayment,
					{
						'network-operator-name': type,
						'phone-card-value': price,
						'phone-card-quantity': number,
					},
					{
						headers: {
							Authorization: `Bearer ${cookies.token}`,
						},
					},
				)
				.then((res) => {
					if (res.status) {
						setCards(res.data.data)
						setIsOpen(true)
						toast('Thanh toán thành công')
					}
				})
		}
	}

	const increase = (prev) => {
		if (prev < 5) setNumber(prev + 1)
	}
	const decrease = (prev) => {
		if (prev > 1) setNumber(prev - 1)
	}

	return (
		<CheckCookie>
			<div className={clsx('', styles.wrapper)}>
				<div className={clsx('', styles.content)}>
					<div className={clsx('', styles.title)}>
						<span>Chọn loại thẻ</span>
						<span className={clsx('mt-3', styles.error)} id="buy-phone-error-1"></span>
					</div>
					<div className={clsx('', styles.cardType)}>
						<label className={clsx('', styles.cardTypeItem)}>
							<input
								onChange={() => setType('Viettel')}
								checked={type === 'Viettel'}
								type="radio"
								name="cardType"
							/>
							<img src="/images/viettel.png" />
						</label>
						<label className={clsx('', styles.cardTypeItem)}>
							<input
								onChange={() => setType('Vinaphone')}
								checked={type === 'Vinaphone'}
								type="radio"
								name="cardType"
							/>
							<img src="/images/vinaphone.png" />
						</label>
						<label className={clsx('', styles.cardTypeItem)}>
							<input
								onChange={() => setType('Mobifone')}
								checked={type === 'Mobifone'}
								type="radio"
								name="cardType"
							/>
							<img src="/images/mobifone.png" />
						</label>
					</div>
					<div className={clsx('', styles.title)}>
						<span>Chọn mệnh giá</span>
						<span className={clsx('mt-3', styles.error)} id="login-error-2"></span>
					</div>
					<div className={clsx('', styles.cardPrice)}>
						<label className={clsx('', styles.cardPriceItem)}>
							<input
								onChange={() => setPrice('10000')}
								checked={price === '10000'}
								type="radio"
								name="cardPrice"
							/>
							<div>
								<span>10.000 đ</span>
							</div>
						</label>
						<label className={clsx('', styles.cardPriceItem)}>
							<input
								onChange={() => setPrice('20000')}
								checked={price === '20000'}
								type="radio"
								name="cardPrice"
							/>
							<div>
								<span>20.000 đ</span>
							</div>
						</label>
						<label className={clsx('', styles.cardPriceItem)}>
							<input
								onChange={() => setPrice('50000')}
								checked={price === '50000'}
								type="radio"
								name="cardPrice"
							/>
							<div>
								<span>50.000 đ</span>
							</div>
						</label>
						<label className={clsx('', styles.cardPriceItem)}>
							<input
								onChange={() => setPrice('100000')}
								checked={price === '100000'}
								type="radio"
								name="cardPrice"
							/>
							<div>
								<span>100.000 đ</span>
							</div>
						</label>
					</div>
					<div className={clsx('', styles.title)}>
						<span>Chọn Số lượng</span>
						<span className={clsx('mt-3', styles.error)} id="login-error-3"></span>
					</div>
					<div className={clsx('', styles.cardQuantity)}>
						<button className={clsx('', styles.diff)} onClick={() => decrease(number)}>
							-
						</button>
						<div className={clsx('d-inline', styles.quantity)}>{number}</div>
						<button className={clsx('', styles.diff)} onClick={() => increase(number)}>
							+
						</button>
					</div>
					<button className={clsx('', styles.submitBtn)} onClick={() => handleSubmit()}>
						<span>Tiếp theo</span>
					</button>
					{isOpen && (
						<BuyPhoneResult cards={cards} number={number} type={type} price={price} setIsOpen={setIsOpen} />
					)}
				</div>
			</div>
		</CheckCookie>
	)
}

export default BuyPhone
