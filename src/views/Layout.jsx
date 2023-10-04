import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import logo from '../assets/logo-bluebg.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout flex flex-col overflow-y-clip h-screen my-auto">
				<header className="flex justify-center items-center mt-2">
					<img
						src={logo}
						alt="BerryCart Logo"
						className="h-20 md:h-64 relative z-10"
					/>
				</header>
				<main className="relative z-10 mx-auto w-[min(72ch,100%)] h-[80vh] sm:h-[65vh] md:h-[70vh] overflow-y-auto border rounded-2xl bg-white pb-10">
					<Outlet />
				</main>
				<div className='absolute z-0 right-0 bg-right bg-[url("../../img/berry-bg.png")] bg-cover inset-0' />
				{/* remove navbar from Home when there is no list token */}
				{listToken && (
					<nav className="z-5 flex fixed py-4 bottom-0 w-full justify-center bg-red-100">
						<div className="flex gap-20">
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
