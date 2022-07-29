import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import styles from './AdminHeaderLayout.module.scss'
import Dialog from '../../Dialog'

function AdminHeaderLayout() {
	const [cookies, setCookies, removeCookies] = useCookies(['adminToken'])
	const { pathname } = useLocation()
	const [isOpen, setIsOpen] = useState(false)
	const [option, setOption] = useState(false)
	const navigate = useNavigate()

	if (option) {
		removeCookies('adminToken')
		navigate('/admin/login')
	}

	const handleLogout = (e) => {
		e.preventDefault()
		setIsOpen(true)
	}

	return (
		<div className={styles.wrapper}>
			<nav className={clsx('navbar navbar-expand-lg', styles.navbar)}>
				<div className="container">
					<Link className="navbar-brand" to="/admin/account/default">
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
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/admin/account/default">
								Tài khoản
							</NavLink>
							<NavLink className={clsx('nav-link', styles.pageLink)} to="/admin/transactions">
								Giao dịch
							</NavLink>
						</div>
					</div>
					<div className="d-flex text-white d-none d-lg-block">
						<div className={styles.rightController}>
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

export default AdminHeaderLayout
