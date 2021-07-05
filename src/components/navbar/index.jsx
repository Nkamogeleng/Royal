import { NavLink } from 'react-router-dom';
import './navstyle.css';
import logo from '../../images/logo.PNG';
import SearchNote from '../notes/searchNote';

function Navbar() {
	const isLoggedIn = localStorage.getItem('isLoggedIn');

	return (
		<nav>
			<img src={logo} alt="logo" id="logo"></img>

			<SearchNote />
			{!isLoggedIn && (
				<ul>
					<li>
						<NavLink exact to="/" activeClassName="main-nav-active">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/about"
							activeClassName="main-nav-active"
						>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/contact"
							activeClassName="main-nav-active"
						>
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/login"
							activeClassName="main-nav-active"
						>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/register"
							activeClassName="main-nav-active"
						>
							Register
						</NavLink>
					</li>
				</ul>
			)}
			{isLoggedIn && (
				<ul>
					<li>
						<NavLink
							exact
							to="/notes"
							activeClassName="main-nav-active"
						>
							Notes
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/user/notes"
							activeClassName="main-nav-active"
						>
							Add Notes
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/"
							activeClassName="main-nav-active"
							onClick={()=>{
								localStorage.clear();
							}}
						>
							Logout
						</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
