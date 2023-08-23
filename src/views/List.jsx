import { ListItem } from '../components';

export function List({ data }) {
	const token = localStorage.getItem('tcl-shopping-list-token');
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<p>Your token is: {token} </p>
			{data.length === 0 && (
				<p>Your shopping list is empty. Click on "Add item" to begin!</p>
			)}
			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
