/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<details className="accordion-item">
			<summary
				className="accordion-title"
				onClick={() => setIsActive(!isActive)}
			>
				{title}
			</summary>
			{isActive && <p className="accordion-content">{content}</p>}
		</details>
	);
};
export default Accordion;
