/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<details className="collapse collapse-arrow join-item border border-base-300">
			<summary
				className="collapse-title text-2xl font-medium"
				onClick={() => setIsActive(!isActive)}
			>
				{title}
			</summary>
			{isActive && <p className="collapse-content">{content}</p>}
		</details>
	);
};
export default Accordion;
