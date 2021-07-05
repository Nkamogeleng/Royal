import './header.css';
// import { Link } from 'react-router-dom';

export default function Header({pageTitle}) {
	return (
			<div className="header-container">
			<div className="overlay"></div>
			<div className="header-content">
			<h2> {pageTitle}</h2>
			</div>
			</div>
	);
}
