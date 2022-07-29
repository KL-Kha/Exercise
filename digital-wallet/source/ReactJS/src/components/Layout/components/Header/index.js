import clsx from 'clsx'
import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Dialog from '../../../Dialog'
import styles from './Header.module.scss'

function Header() {
	const [cookies, setCookies, removeCookies] = useCookies(['token'])
	const [isOpen, setIsOpen] = useState(false)
	const { pathname } = useLocation()
	const [option, setOption] = useState(false)
	const navigate = useNavigate()

	if (option) {
		removeCookies('token')
		navigate('/signin')
	}

	const handleLogout = (e) => {
		e.preventDefault()
		setIsOpen(true)
	}

	return (
		<div className={styles.wrapper}>
			<nav className={clsx('navbar navbar-expand-lg', styles.navbar)}>
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img className={styles.logo} src="/logo.webp" alt="logo" />
					</Link>
					<button
						className={clsx('navbar-toggler', styles.togglerBtn)}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#nav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="fa-solid fa-align-justify text-white"></i>
					</button>
					<div className={clsx('collapse navbar-collapse', styles.nav)} id="nav">
						<div className="navbar-nav">
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/">
								Trang chủ
							</NavLink>
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/transactions/topup">
								Giao dịch
							</NavLink>
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/activity">
								Hoạt động
							</NavLink>
						</div>
					</div>
					<div className="d-flex text-white d-none d-lg-block">
						<div className={styles.rightController}>
							<Link to="/account">
								<i className="fa-solid fa-gear"></i>
							</Link>

							<Link to="/logout" onClick={(e) => handleLogout(e)}>
								Đăng xuất
							</Link>
						</div>
					</div>
					{isOpen && <Dialog setOption={setOption} setIsOpen={setIsOpen} message="Bạn muốn đăng xuất?" />}
				</div>
			</nav>
		</div>
	)
}

export default Header
