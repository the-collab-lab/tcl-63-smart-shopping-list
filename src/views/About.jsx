/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import homeImg from '../assets/mockup-homepage.png';
import addItemImg from '../assets/mockup-additem.png';
import listImg from '../assets/mockup-listpage.png';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Accordion from './Accordion';
import { accordionData } from './accordionData';

export const About = ({ listToken }) => {
	const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
	return (
		<>
			<div className="pt-10 text-center">
				{listToken ? (
					<NavLink to="/list">
						{' '}
						<ArrowLeftIcon className="h-10 w-10 hover:text-red-400" />
					</NavLink>
				) : (
					<NavLink to="/">
						{' '}
						<ArrowLeftIcon className="h-10 w-10 hover:text-red-400" />
					</NavLink>
				)}
				<h1 className="font-bold text-4xl mb-6 max-md:mt-6">
					How BerryCart Works
				</h1>
				<section className="chat md:chat-start centered-section pb-6">
					<p className="chat-bubble chat-bubble-secondary md:w-1/2">
						BerryCart is a personalized shopping list. You can manage your
						grocery items in one app.
					</p>
				</section>
				<div className="flex lg:flex-row max-md:flex-col-reverse justify-center items-center">
					<img
						src={homeImg}
						alt="home page mockup"
						className="h-[500px] max-md:h-[430px]"
					/>
					<section className="chat chat-start max-md:mb-2">
						<p className="chat-bubble chat-bubble-secondary">
							Start by creating a new list, or enter your three-word token to
							access an existing shopping list.
						</p>
					</section>
				</div>
				<div className="flex flex-col md:flex-row justify-center items-center mt-5">
					<section className="chat chat-end max-md:chat-start pr-10">
						<p className="chat-bubble chat-bubble-secondary">
							You can easily add a new item to the list, and choose how soon you
							will buy this item again.{' '}
						</p>
					</section>
					<img
						src={addItemImg}
						alt="add item page mockup"
						className="h-[500px] max-md:h-[430px] mt-2"
					/>
				</div>
				<div className="flex lg:flex-row max-md:flex-col-reverse justify-center items-center">
					<img
						src={listImg}
						alt="list page mockup"
						className="h-[500px] max-md:h-[430px]"
					/>
					<div className="flex flex-col gap-7">
						<section className="chat chat-start">
							<p className="chat-bubble chat-bubble-secondary">
								Your newly added item will appear in the List view. You can mark
								an item as purchased by checking it off from the list.{' '}
							</p>
						</section>
						<section className="chat chat-start max-md:mb-2">
							<p className="chat-bubble chat-bubble-secondary">
								BerryCart will learn your purchasing frequency and estimate how
								soon you will likely need this item again.
							</p>
						</section>
					</div>
				</div>
				<section className="centered-section mt-5">
					<p className="chat-bubble chat-bubble-secondary lg:w-1/2">
						Simply share your three-word token with friends and family to shop
						together!
					</p>
				</section>
			</div>
			{/* ACCORDIAN */}
			<div className="w-full my-4">
				<h2 className="font-bold text-4xl text-center my-4">FAQ</h2>
				<div className="space-y-3">
					{accordionData.map(({ title, content }, index) => (
						<Accordion
							title={title}
							content={content}
							index={index}
							activeIndex={activeAccordionIndex}
							setActiveIndex={setActiveAccordionIndex}
						/>
					))}
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
