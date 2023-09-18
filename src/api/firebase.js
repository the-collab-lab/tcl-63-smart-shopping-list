import {
	collection,
	onSnapshot,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listId
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */

export function useShoppingListData(listId, itemId) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// in the Home component an invalid token is set to null and any calls to Firestore are skipped
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
	const { dateLastPurchased, dateNextPurchased, totalPurchases } =
		itemDoc.data();

	const today = new Date();

	const checkedDateLastPurchased = checked ? today : dateLastPurchased;

	if (!checkedDateLastPurchased) {
		console.error('Could not update');
		return;
	}

	const dateNextPurchasedAsDate = dateNextPurchased.toDate();

	/**
	 * Calculate the previous estimate for purchase
	 * based on historical data
	 */
	const previousEstimate = getDaysBetweenDates(
		checkedDateLastPurchased,
		dateNextPurchasedAsDate,
	);

	/**
	 * Calculate the days since the last transaction,
	 * considering either date last purchased or the created date
	 */
	const daysSinceLastTransaction = getDaysBetweenDates(
		today,
		checkedDateLastPurchased,
	);

	let daysTillNextPurchase = calculateEstimate(
		previousEstimate,
		daysSinceLastTransaction,
		totalPurchases,
	);

	// Ensure that the next purchase date is at least one day in the future
	if (daysTillNextPurchase <= 0) {
		daysTillNextPurchase = 1;
	}

	if (dateNextPurchasedAsDate < checkedDateLastPurchased) {
		// Set checked to false so the item can be purchased again
		checked = false;
	}

	try {
		return updateDoc(itemRef, {
			dateLastPurchased: checkedDateLastPurchased,
			dateNextPurchased: getFutureDate(daysTillNextPurchase),
			totalPurchases: totalPurchases + 1,
			checked: checked,
		});
	} catch (error) {
		console.log('updateDoc error', error);
	}
}

export async function deleteItem(listId, itemId) {
	const itemRef = doc(db, listId, itemId);
	try {
		return await deleteDoc(itemRef);
	} catch (error) {
		console.log('Delete item error', error);
	}
	
}
