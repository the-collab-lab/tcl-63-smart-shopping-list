import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useState } from 'react';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1 className="text-5xl font-bold pb-2 pt-10">Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				{/* remove navbar from Home when there is no list token */}
				{listToken && (
					<nav className="Nav bg-red-100">
						<div className="Nav-container">
							{/* this removes the Home navlink from the List and AddItem pages when there is a token assigned */}
							{!listToken && (
								<NavLink
									to="/"
									className="Nav-link text-slate-950 hover:text-slate-700"
									activeClassName="active"
								>
									Home
								</NavLink>
							)}
							<NavLink
								to="/list"
								className="Nav-link text-slate-950 hover:text-slate-700"
								activeClassName="active"
							>
								List
							</NavLink>
							<NavLink
								to="/add-item"
								className="Nav-link text-slate-950 hover:text-slate-700"
								activeClassName="active"
							>
								Add Item
							</NavLink>
						</div>
					</nav>
				)}
			</div>
		</>
	);
}
