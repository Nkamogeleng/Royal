import './footerstyle.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.PNG';

const Footer = () => {
	return (
		<footer>
			<div id="footer-grid">
				<div className="footer-links-container">
					<img src={logo} alt="logo" id="logo"></img>
				</div>
				<div className="footer-links-container">
					<h4>Thank you for visiting our website</h4>

						 
					 <div className="footer-links">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>

					</div>
				</div>
				
			</div>
			<div className="underline"></div>
			<div className="copyright">
				<h5>&copy; Women Techsters 2021 SWD Track Team Royal</h5>
			</div>
		</footer>
	);
};

export default Footer;
