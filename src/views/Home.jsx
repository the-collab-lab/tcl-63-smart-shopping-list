import { generateToken } from '@the-collab-lab/shopping-list-utils';
import Button from '../components/Button';
import './Home.css';

export function Home({ setListToken }) {
	//This function generates a new unique Token corresponding to a new shopping list.

	const createNewList = () => {
		const newToken = generateToken();
		setListToken(newToken);
	};

	return (
		<div className="Home">
			<Button label={'Create New List'} onClick={createNewList} />
			<p>-or-</p>
			<p>Join an existing shopping list by entering a three word token.</p>

			<form>
				<label htmlFor="token">Share token</label>
				<input type="text" name="token" />

				<Button label="Join an existing list" type="submit" />
			</form>
		</div>
	);
}
