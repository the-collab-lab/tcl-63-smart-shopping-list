import {
	collection,
	onSnapshot,
	addDoc,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate } from '../utils';

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listId
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */

export function useShoppingListData(listId) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listId) return;

		// When we get a listId, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listId), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listId]);

	// Return the data so it can be used by our React components.
	return data;
}

// OPTION B: NEWLY CREATED LIST IS ADDED TO FIRESTORE
// NORMALLY FIRESTORE CREATES A COLLECTION WHEN A DOC IS ADDED TO IT;
// HERE WE ARE ADDING AN EMPTY DOC TO THE COLLECTION SO WE CAN SAVE THE LIST TO FIRESTORE RIGHT AFTER IT'S CREATED

export async function addNewListToFirestore(listId) {
	const newListCollectionRef = collection(db, listId);
	return addDoc(newListCollectionRef, {});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */

export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
		checked: false,
	});
}

/**
 * update a user's list item in Firebase
 * @param {*} listId The list token we are modifying its data.
 * @param {*} itemId The item id.
 * @param {*} checked A boolean value indicating whether the item is purchased.
 */
export async function updateItem(listId, itemId, checked) {
	const itemRef = doc(db, listId, itemId);
	const itemDoc = await getDoc(itemRef);
	const { dateLastPurchased, totalPurchases } = itemDoc.data();

	try {
		return updateDoc(itemRef, {
			dateLastPurchased: checked ? new Date() : dateLastPurchased,
			totalPurchases: checked ? totalPurchases + 1 : totalPurchases,
			checked: checked,
		});
	} catch (error) {
		console.log('updateDoc error', error);
	}
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}
