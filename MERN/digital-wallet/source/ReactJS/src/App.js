import { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import {
	DefaultLayout,
	HeaderLayout,
	TransactionHeaderLayout,
	AccountBalanceLayout,
	AdminLayout,
	AdminAccountHeaderLayout,
	AdminTransactionHeaderLayout,
} from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Activity from './pages/Activity'
import ForgetPassword from './pages/ForgetPassword'
import { BuyPhone, Topup, Withdraw, SendMoney } from './pages/Transaction'
import Account from './pages/Admin/Account'
import Transaction from './pages/Admin/Transaction'
import Login from './pages/Admin/Login'
import UpdateIdentifyCard from './pages/UpdateIdentifyCard'

const BalanceContext = createContext()

function App() {
	const [balance, setBalance] = useState(0)

	return (
		<Router>
			<BalanceContext.Provider value={balance}>
				<Routes>
					<Route
						path="/"
						element={
							<DefaultLayout>
								<Home />
							</DefaultLayout>
						}
					/>
					<Route
						path="/transactions/topup"
						element={
							<DefaultLayout>
								<TransactionHeaderLayout />
								<AccountBalanceLayout>
									<Topup />
								</AccountBalanceLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/transactions/withdraw"
						element={
							<DefaultLayout>
								<TransactionHeaderLayout />
								<AccountBalanceLayout>
									<Withdraw />
								</AccountBalanceLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/transactions/buy-phone"
						element={
							<DefaultLayout>
								<TransactionHeaderLayout />
								<AccountBalanceLayout>
									<BuyPhone />
								</AccountBalanceLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/transactions/send-money"
						element={
							<DefaultLayout>
								<TransactionHeaderLayout />
								<AccountBalanceLayout>
									<SendMoney />
								</AccountBalanceLayout>
							</DefaultLayout>
						}
					/>
					<Route
						path="/activity"
						element={
							<HeaderLayout>
								<Activity />
							</HeaderLayout>
						}
					/>
					<Route
						path="/account"
						element={
							<HeaderLayout>
								<Profile />
							</HeaderLayout>
						}
					/>
					<Route path="/update-identity" element={<UpdateIdentifyCard />} />
					<Route path="/admin/login" element={<Login />} />
					<Route
						path="/admin/account/default"
						element={
							<AdminLayout>
								<AdminAccountHeaderLayout />
								<Account />
							</AdminLayout>
						}
					/>
					<Route
						path="/admin/account/pending"
						element={
							<AdminLayout>
								<AdminAccountHeaderLayout />
								<Account />
							</AdminLayout>
						}
					/>
					<Route
						path="/admin/account/disabled"
						element={
							<AdminLayout>
								<AdminAccountHeaderLayout />
								<Account />
							</AdminLayout>
						}
					/>
					<Route
						path="/admin/account/locked"
						element={
							<AdminLayout>
								<AdminAccountHeaderLayout />
								<Account />
							</AdminLayout>
						}
					/>
					<Route
						path="/admin/transactions"
						element={
							<AdminLayout>
								<Transaction />
							</AdminLayout>
						}
					/>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/reset" element={<ForgetPassword />} />
					<Route path="*" element={<h1>404</h1>} />
				</Routes>
			</BalanceContext.Provider>
		</Router>
	)
}

export default App
