import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';

export function Layout({listToken}) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						{/* this removes the Home navlink from the List and AddItem pages when there is a token assigned */}
						{!listToken && <NavLink to="/" className="Nav-link">
							Home
						</NavLink>}
						<NavLink to="/list" className="Nav-link">
							List
						</NavLink>
						<NavLink to="/add-item" className="Nav-link">
							Add Item
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
