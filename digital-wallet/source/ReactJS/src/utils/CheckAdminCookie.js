import { useCookies } from 'react-cookie'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function CheckAdminCookie({ children }) {
	const [cookies, setCookies] = useCookies(['adminToken'])
	const navigate = useNavigate()
	useEffect(() => {
		if (!cookies.adminToken) {
			navigate('/admin/login')
		}
	})
	return <>{children}</>
}

export default CheckAdminCookie
