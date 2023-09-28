import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useState } from 'react';

export function Layout({ listToken }) {
	const [isActive, setIsActive] = useState({
		home: false,
		list: false,
		addItem: false,
	});

	function handleNavLinkClick(linkName) {
		setIsActive((prevState) => ({
			home: linkName === 'home' ? true : false,
			list: linkName === 'list' ? true : false,
			addItem: linkName === 'addItem' ? true : false,
		}));
	}

	const navLinkStyles = `
    text-aquamarine-blue 
    text-center 
    py-6 
    md:px-6 
    md:pb-2
    hover:underline
    hover:decoration-4
    hover:underline-offset-[10px]
  `;

	const activeNavLinkStyles = `
  ${navLinkStyles}
  underline
  decoration-4
  underline-offset-[10px]
`;

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1 className="text-5xl">Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav bg-red-100">
					<div className="Nav-container">
						{/* this removes the Home navlink from the List and AddItem pages when there is a token assigned */}
						{!listToken && (
							<NavLink
								to="/"
								className={`Nav-link text-slate-950 hover:text-slate-500 ${
									isActive['home'] &&
									'font-bold underline decoration-red-400 underline-offset-2'
								}`}
								onClick={() => handleNavLinkClick('home')}
							>
								Home
							</NavLink>
						)}
						<NavLink
							to="/list"
							className={`Nav-link text-slate-950 hover:text-slate-500 ${
								isActive['list'] &&
								'font-bold underline decoration-red-400 underline-offset-2'
							}`}
							onClick={() => handleNavLinkClick('list')}
						>
							List
						</NavLink>
						<NavLink
							to="/add-item"
							className={`Nav-link text-slate-950 hover:text-slate-500 ${
								isActive['addItem'] &&
								'font-bold underline decoration-red-400 underline-offset-2'
							}`}
							onClick={() => handleNavLinkClick('addItem')}
						>
							Add Item
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
