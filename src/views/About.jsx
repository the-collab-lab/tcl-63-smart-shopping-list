import React from 'react';
import { NavLink } from 'react-router-dom';
import homeImg from '../assets/mockup-homepage.png';
import addItemImg from '../assets/mockup-additem.png';
import listImg from '../assets/mockup-listpage.png';

export const About = () => {
	return (
		<>
			<div className="pt-10 text-center">
				<h1 className="font-bold text-4xl mb-4">How BerryCart Works</h1>
				<section className="chat chat-start">
					<p className="chat-bubble chat-bubble-secondary w-1/2">
						BerryCart is a personalized shopping list. You can manage your
						grocery items in one app.
					</p>
				</section>
				<div className="flex justify-center items-center mt-2">
					<img src={homeImg} alt="home page mockup" className="h-[500px]" />
					<section className="chat chat-start">
						<p className="chat-bubble chat-bubble-secondary">
							Start by creating a new list, or enter your three-word token to
							access an existing shopping list.
						</p>
					</section>
				</div>
				<div className="flex justify-center items-center">
					<section className="chat chat-start">
						<p className="chat-bubble chat-bubble-secondary">
							You can easily add a new item to the list, and choose how soon you
							will buy this item again.{' '}
						</p>
					</section>
					<img
						src={addItemImg}
						alt="add item page mockup"
						className="h-[500px]"
					/>
				</div>
				<div className="flex justify-center items-center">
					<img src={listImg} alt="list page mockup" className="h-[500px]" />
					<div className="flex flex-col gap-7">
						<section className="chat chat-end">
							<p className="chat-bubble chat-bubble-secondary">
								Your newly added item will appear in the List view. You can mark
								an item as purchased by checking it off from the list.{' '}
							</p>
						</section>
						<section className="chat chat-start">
							<p className="chat-bubble chat-bubble-secondary">
								BerryCart will learn your purchasing frequency and estimate how
								soon you will likely need this item again.
							</p>
						</section>
					</div>
				</div>
				<section className="chat chat-start">
					<p className="chat-bubble chat-bubble-secondary w-1/2">
						Simply share your three-word token with friends and family to shop
						together!
					</p>
				</section>
			</div>
			{/* ACCORDIAN */}
			<div className="join join-vertical w-full my-4">
				<h1 className="font-bold text-4xl text-center my-4">FAQ</h1>
				<div className="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-4" />
					<div className="collapse-title text-2xl font-medium">
						Can I add the same item twice?
					</div>
					<div className="collapse-content">
						<p>You can't add identicial item to the same list twice.</p>
					</div>
				</div>
				<div className="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-4" />
					<div className="collapse-title text-2xl font-medium">
						Why does my urgency tag flip to "soon" after I marked an item as
						purchased?
					</div>
					<div className="collapse-content">
						<p>
							When you first add a new item, it will take us some time to learn
							how soon you may need this item again. Overtime, BerryCart will
							adjust the tags according to your purchasing frequency.
						</p>
					</div>
				</div>
				<div className="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-4" />
					<div className="collapse-title text-2xl font-medium">
						Why can't I uncheck an item immediately after I marked it as
						purchased?
					</div>
					<div className="collapse-content">
						<p>
							We assume you wouldn't need the same item within the next 24
							hours. After 24 hours, the item will uncheck itself.
						</p>
					</div>
				</div>
				<div className="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-4" />
					<div className="collapse-title text-2xl font-medium">
						Can I add non-english words as item name?
					</div>
					<div className="collapse-content">
						<p>We currently only support English.</p>
					</div>
				</div>
			</div>
			{/* BUTTON */}
			<div className="text-center">
				<NavLink to="/" className="btn btn-neutral mt-3">
					Get Started
				</NavLink>
			</div>
		</>
	);
};
