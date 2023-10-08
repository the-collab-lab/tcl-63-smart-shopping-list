/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

const Accordion = ({ title, content, index, activeIndex, setActiveIndex }) => {
	return (
		<details
			className="collapse collapse-arrow border border-base-300"
			aria-live="polite"
		>
			<summary
				className="collapse-title text-2xl font-medium"
				onClick={() => setActiveIndex(activeIndex === index ? null : index)}
			>
				{title}
			</summary>
			{activeIndex === index && <p className="collapse-content">{content}</p>}
		</details>
	);
};
export default Accordion;
