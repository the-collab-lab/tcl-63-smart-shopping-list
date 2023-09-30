import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import logo from '../../public/img/logo-bluebg.png';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout flex flex-col overflow-y-clip h-screen my-auto">
				<header className="Layout-header flex justify-center items-center mt-2">
					<img
						src={logo}
						alt="BerryCart Logo"
						className="h-20 md:h-64 relative z-10"
					/>
				</header>
				<main className="mx-auto w-[min(72ch,100%)] h-[65vh] overflow-y-auto border rounded-2xl bg-white relative z-10 pb-10">
					<Outlet />
				</main>
				<div className='fixed right-0 bg-right bg-[url("../../public/img/berry-bg.png")] bg-cover inset-0 z-0' />
				{/* remove navbar from Home when there is no list token */}
				{listToken && (
					<nav className="flex fixed py-4 bottom-0 w-full justify-center bg-red-100 z-10">
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
