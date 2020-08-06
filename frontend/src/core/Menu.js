import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../auth';
import './css/menu.scss';
import logo from '../resources/images/gas.png';

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: '#ffffff', backgroundColor: '#7d3cd3' };
	} else {
		return { color: '#ffffff' };
	}
};

const returnStyleForTitle = (history, path) => {
	if (history.location.pathname !== path) {
		return {
			color: 'rgb(180,35,41)',
			border: '1px solid #fff',
			height: '42px',
			fontWeight: 'bold',
			backgroundColor: '#fff',
			boxShadow: '6px 8px 16px 0px rgba(92,44,44,0.95)'
		};
	} else {
		return {
			color: 'rgb(180,35,41)',
			height: '42px'
		};
	}
};

const test = () => {
	if (isAuthenticated()) {
		return true;
	} else {
		return false;
	}
};

const Menu = ({ history }) => (
	<div>
		<ul className="nav nav-pills fixed-top">
			<li className={`nav-item ${isAuthenticated() ? '' : 'mr-auto'}`}>
				<Link className="nav-link" style={returnStyleForTitle(history, '/')} to="/">
					{/*<img src="https://cdn0.iconfinder.com/data/icons/science-and-technology-11/128/gas_power_cylinder_lpg-512.png" width="30"
                         className="" alt=""/> SURYA SOLUTION*/}
					{/*<img style={{marginTop: '-5px'}} src="https://5.imimg.com/data5/UI/YO/OU/SELLER-93416289/domestic-lpg-cylinder-500x500.jpg" width="30"
                         className="" alt=""/> SURYA SOLUTION*/}
					<img style={{ margin: '-5px 0px 0px -5px' }} src={logo} width="30" className="" alt="" /> SURYA
					SOLUTION
				</Link>
			</li>
			{isAuthenticated() && (
				<li className="nav-item mr-auto">
					<Link className="nav-link" style={isActive(history, '/UserDashBoard')} to="/UserDashBoard">
						DASHBOARD
					</Link>
				</li>
			)}
			<li className="nav-item float-left">
				<Link className="nav-link" style={isActive(history, '/')} to="/">
					HOME
				</Link>
			</li>

			{!isAuthenticated() && (
				<Fragment>
					<li className="nav-item">
						<Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
							SIGN IN
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
							SIGN UP
						</Link>
					</li>
				</Fragment>
			)}

			{isAuthenticated() && (
				<li className="nav-item">
					<span
						className="nav-link"
						style={{ cursor: 'pointer', color: '#ffffff' }}
						onClick={() =>
							signOut(() => {
								history.push('/');
							})}
					>
						SIGN OUT
					</span>
				</li>
			)}
		</ul>
	</div>
);

export default withRouter(Menu);
