const URL = 'http://localhost:46789'

const API = {
	register: `${URL}/api/register`,
	login: `${URL}/api/login`,
	getPersonInformation: `${URL}/api/get-personal-information`,
	digitalWalletTranferHistory: `${URL}/api/digital-wallet/transfer-history`,
	digitalWalletRechangeMoney: `${URL}/api/digital-wallet/recharge-money`,
	digitalWalletWithdrawMoney: `${URL}/api/digital-wallet/withdraw-money`,
	digitalWalletServicePayment: `${URL}/api/digital-wallet/service-payment`,
	digitalWalletTranferMoneyFind: `${URL}/api/digital-wallet/transfer-money/find/`,
	digitalWalletTranferMoney: `${URL}/api/digital-wallet/transfer-money`,
	digitalWalletTranferMoneyVerify: `${URL}/api/digital-wallet/transfer-money/verify`,
	requestForgotPasswordOTP: `${URL}/api/forgot-password/request-forgot-password-otp`,
	verifyForgotPasswordOTP: `${URL}/api/forgot-password/verify-forgot-password-otp`,
	changePasswordForgot: `${URL}/api/change-password/require`,
	updateIdentityCard: `${URL}/api/update-identity-card`,
	changePasswordRequire: `${URL}/api/change-password/require`,
	changePassword: `${URL}/api/change-password/optional`,

	adminManagerGetAccountByState: `${URL}/api/admin-account-management/get-accounts-by-state`,
	adminTranferManagerWaitingTranfer: `${URL}/api/admin-transfer-management/transfer-waiting`,
	adminAccountManagementUpdateAccountState: `${URL}/api/admin-account-management/update-account-state`,
	adminAccountManagementGetBannedAccount: `${URL}/api/admin-account-management/get-banned-accounts`,
	adminAccountManagementUnBanAccount: `${URL}/api/admin-account-management/unbanned-account`,
	adminTransferManagerUser: `${URL}/api/admin-transfer-management/user`,
}
export default API
