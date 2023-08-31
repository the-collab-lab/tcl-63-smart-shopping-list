import { ListItem } from '../components';

export function List({ data, listToken }) {
	// OPTION B - GOES WITH OPTION B IN Firebase.js and OPTION B IN Home.jsx
	// FILTER OUT THE DATA THAT CONTAINS AN OBJECT WITH NO NAME PROPERTY
	const realData = data.filter((item) => item.name);

	return (
		<>
			<p>Your token is: {listToken}</p>
			{/* PART OF OPTION B. OTHERWISE USE data.length FOR OPTION A*/}
			{realData.length === 0 && (
				<p>Your shopping list is empty. Click on "Add item" to begin!</p>
			)}
			<ul>
				{/* PART OF OPTION B. OTHERWISE USE data.map FOR OPTION A*/}
				{/* POSSIBLE CONFLICT WITH ISSUE #6 */}
				{realData.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
