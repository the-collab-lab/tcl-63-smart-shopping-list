import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import logo from '../assets/logo-bluebg.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout flex flex-col overflow-y-clip h-screen">
				<header className="flex justify-center items-center mt-2">
					<img
						src={logo}
						alt="BerryCart Logo"
						className="h-20 md:h-64 relative z-10"
					/>
				</header>
				<main className="relative z-10 mx-auto w-[min(72ch,95%)] h-[75vh] lg:h-[65vh] md:h-[70vh] overflow-y-auto border rounded-2xl bg-white pb-10">
					<Outlet />
				</main>
				<div className='absolute z-0 right-0 bg-right bg-[url("../../img/berry-bg.png")] bg-cover inset-0' />
			</div>
			{/* remove navbar from Home when there is no list token */}
			{listToken && (
				<nav className="z-5 flex fixed py-1 md:py-2 lg:py-4 bottom-0 w-full justify-center bg-red-100 mt-5">
					<div className="flex gap-20">
						{/* this removes the Home navlink from the List and AddItem pages when there is a token assigned */}
						{!listToken && (
							<NavLink
								to="/"
								className="Nav-link text-slate-950 hover:text-slate-700"
							>
								Home
							</NavLink>
						)}
						<NavLink
							to="/list"
							className="Nav-link text-slate-950 hover:text-slate-700"
						>
							List
						</NavLink>
						<NavLink
							to="/add-item"
							className="Nav-link text-slate-950 hover:text-slate-700"
						>
							Add Item
						</NavLink>
					</div>
				</nav>
			)}
		</>
	);
}
