import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useState } from 'react';
import logo from '../../public/img/logo.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout overflow-y-clip h-screen my-auto">
				<header className="Layout-header flex justify-center items-center">
					<img
						src={logo}
						alt="BerryCart Logo"
						className="h-20 md:h-64 relative z-10"
					/>
				</header>
				<main className="Layout-main border rounded-2xl bg-white relative z-10 pb-10 max-h-[calc(100vh - 100px)]">
					<Outlet />
				</main>
				<div className='fixed right-0 bg-right bg-[url("../../public/img/berry-bg.png")] bg-cover inset-0 z-0' />
				{/* remove navbar from Home when there is no list token */}
				{listToken && (
					<nav className="Nav bg-red-100 z-10">
						<div className="flex justify-evenly gap-20">
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
