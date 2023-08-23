import { ListItem } from '../components';

export function List({ data, listToken }) {
	/**
	 * Retrieve the user's shopping list token from the local storage.
	 * This is a temporary solution to display the token on the page,
	 * ensuring that users have a reference in case they forget their unique token.
	 */
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<p>Your token is: {listToken}</p>
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
