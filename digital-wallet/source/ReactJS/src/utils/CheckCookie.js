import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function CheckCookie({ children }) {
	const [cookies, setCookies] = useCookies(['token'])
	const navigate = useNavigate()
	useEffect(() => {
		if (!cookies.token) {
			navigate('/signin')
		}
	})
	return <>{children}</>
}

export default CheckCookie
