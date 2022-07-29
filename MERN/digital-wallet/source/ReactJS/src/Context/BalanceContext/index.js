import { useState, createContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import API from '../../API'

const BalanceContext = createContext()

function BalanceProvider({ children }) {
	const [balance, setBalance] = useState(0)
	const [cookies, setCookies] = useCookies(['token'])

	useEffect(() => {
		axios
			.get(API.getPersonInformation, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				if (res.status) {
					setBalance(res.data.data.balance)
				}
			})
			.catch((err) => {})
	}, [])
	const value = {
		balance,
		changeBalance: (amount) => {
			setBalance(amount)
		},
	}

	return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
}

export { BalanceContext, BalanceProvider }
